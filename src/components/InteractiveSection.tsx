import { motion, AnimatePresence } from 'motion/react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stage, Box, Cylinder, Text, Edges, useGLTF, Center } from '@react-three/drei';
import { useState, useRef, Suspense } from 'react';
import { Upload, ScanLine, CheckCircle, Box as BoxIcon, Activity, Smartphone, QrCode, X, Sparkles, ExternalLink } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import * as THREE from 'three';

function BeamFailureAnimation() {
  const leftHalfRef = useRef<THREE.Group>(null);
  const rightHalfRef = useRef<THREE.Group>(null);
  const loadRef = useRef<THREE.Group>(null);
  const leftMatRef = useRef<THREE.MeshStandardMaterial>(null);
  const rightMatRef = useRef<THREE.MeshStandardMaterial>(null);
  const crackMatRef = useRef<THREE.MeshStandardMaterial>(null);
  const textRef = useRef<any>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() % 6; // 6 second loop
    
    // Phase 1: 0-1s (Load descends)
    // Phase 2: 1-3s (Beam bends, load pushes down)
    // Phase 3: 3-4.5s (Failure/Crack appears, red flashing)
    // Phase 4: 4.5-6s (Reset)

    let bendAngle = 0;
    let loadY = 3.5;
    let crackOpacity = 0;
    let stressColor = new THREE.Color("#cccccc"); // Default concrete color
    let loadText = "10 kN";

    if (t < 1) {
      loadY = 3.5 - t * 0.9; // Descends to 2.6
      loadText = "10 kN";
    } else if (t < 3) {
      const progress = (t - 1) / 2; // 0 to 1
      bendAngle = progress * 0.15; // Max bend 0.15 rad
      loadY = 2.6 - Math.sin(bendAngle) * 2; // Moves down with the hinge
      
      // Interpolate color from gray to red based on stress
      stressColor.lerp(new THREE.Color("#ff5555"), progress);
      loadText = `${Math.floor(10 + progress * 90)} kN`;
    } else if (t < 4.5) {
      bendAngle = 0.15;
      loadY = 2.6 - Math.sin(bendAngle) * 2;
      crackOpacity = Math.sin(t * 20) * 0.5 + 0.5; // Flashing crack
      stressColor = new THREE.Color("#ff2222");
      loadText = "FAILURE!";
    } else {
      // Reset smoothly
      bendAngle = 0;
      loadY = 3.5;
      crackOpacity = 0;
      loadText = "0 kN";
    }

    if (leftHalfRef.current && rightHalfRef.current) {
      leftHalfRef.current.rotation.z = -bendAngle;
      rightHalfRef.current.rotation.z = bendAngle;
    }
    
    if (leftMatRef.current && rightMatRef.current) {
      leftMatRef.current.color.copy(stressColor);
      rightMatRef.current.color.copy(stressColor);
    }
    
    if (loadRef.current) {
      loadRef.current.position.y = loadY;
    }

    if (crackMatRef.current) {
      crackMatRef.current.opacity = crackOpacity;
    }

    if (textRef.current) {
      textRef.current.text = loadText;
      textRef.current.color = t >= 3 && t < 4.5 ? "#ff0000" : "#ffffff";
      if (textRef.current.sync) textRef.current.sync();
    }
  });

  return (
    <group position={[0, -1.5, 0]}>
      {/* Supports */}
      <Box args={[0.6, 2, 0.6]} position={[-2.2, 1, 0]}>
        <meshStandardMaterial color="#555555" />
        <Edges scale={1.01} color="#222222" />
      </Box>
      <Box args={[0.6, 2, 0.6]} position={[2.2, 1, 0]}>
        <meshStandardMaterial color="#555555" />
        <Edges scale={1.01} color="#222222" />
      </Box>

      {/* Beam Left Half */}
      <group position={[-2, 2.25, 0]} ref={leftHalfRef}>
        <Box args={[2, 0.5, 0.5]} position={[1, 0, 0]}>
          <meshStandardMaterial ref={leftMatRef} color="#cccccc" />
          <Edges scale={1.01} color="#444444" />
        </Box>
      </group>

      {/* Beam Right Half */}
      <group position={[2, 2.25, 0]} ref={rightHalfRef}>
        <Box args={[2, 0.5, 0.5]} position={[-1, 0, 0]}>
          <meshStandardMaterial ref={rightMatRef} color="#cccccc" />
          <Edges scale={1.01} color="#444444" />
        </Box>
      </group>

      {/* Crack indicator (Jagged shape or simple red box) */}
      <Box args={[0.05, 0.6, 0.52]} position={[0, 2.25, 0]}>
        <meshStandardMaterial ref={crackMatRef} color="#ff0000" transparent opacity={0} emissive="#ff0000" emissiveIntensity={2} />
      </Box>

      {/* Applied Load (Hydraulic Press / Weight) */}
      <group ref={loadRef} position={[0, 3.5, 0]}>
        <Cylinder args={[0.05, 0.2, 0.5, 16]} rotation={[0, 0, 0]} position={[0, -0.25, 0]}>
          <meshStandardMaterial color="#ff3333" metalness={0.5} roughness={0.2} />
        </Cylinder>
        <Box args={[0.8, 0.6, 0.8]} position={[0, 0.3, 0]}>
          <meshStandardMaterial color="#222222" metalness={0.8} roughness={0.2} />
          <Edges scale={1.01} color="#555555" />
        </Box>
        <Text 
          ref={textRef}
          position={[0, 0.3, 0.41]} 
          fontSize={0.2} 
          color="white" 
          anchorX="center" 
          anchorY="middle"
        >
          10 kN
        </Text>
      </group>
      
      {/* Floor Grid/Base */}
      <Box args={[8, 0.1, 4]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#1a1a1a" />
        <gridHelper args={[8, 16, "#333333", "#222222"]} position={[0, 0.06, 0]} />
      </Box>
    </group>
  );
}

function CasaVibratoriaModel() {
  const { scene } = useGLTF('/casavibratoria.glb');
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      <Center top>
        <primitive object={scene} />
      </Center>
    </group>
  );
}

function TrussBridgeModel() {
  const steelMat = <meshStandardMaterial color="#334155" metalness={0.8} roughness={0.2} />;
  const connectionMat = <meshStandardMaterial color="#ea580c" metalness={0.8} roughness={0.15} />;
  const waterMat = <meshStandardMaterial color="#0284c7" transparent opacity={0.5} roughness={0.1} metalness={0.1} />;

  return (
    <group position={[0, -1.2, 0]}>
      {/* Abutments (Concrete Support blocks) */}
      <Box args={[1.0, 1.4, 2.2]} position={[-3.0, 0, 0]}>
        <meshStandardMaterial color="#475569" roughness={0.9} />
        <Edges scale={1.01} color="#334155" />
      </Box>
      <Box args={[1.0, 1.4, 2.2]} position={[3.0, 0, 0]}>
        <meshStandardMaterial color="#475569" roughness={0.9} />
        <Edges scale={1.01} color="#334155" />
      </Box>

      {/* Solid Bridge Deck */}
      <Box args={[5.0, 0.25, 1.6]} position={[0, 0.7 + 0.125, 0]}>
        <meshStandardMaterial color="#1e293b" roughness={0.85} />
        <Edges scale={1.01} color="#334155" />
      </Box>
      {/* Yellow central lines on road deck */}
      <Box args={[5.0, 0.01, 0.05]} position={[0, 0.7 + 0.26, 0]}>
        <meshBasicMaterial color="#eab308" />
      </Box>

      {/* Back Truss Line (z = -0.8) */}
      <group position={[0, 0.7, -0.8]}>
        {/* Bottom Chord */}
        <Box args={[5.0, 0.1, 0.08]} position={[0, 0.05, 0]}>{steelMat}</Box>
        {/* Top Chord */}
        <Box args={[3.2, 0.1, 0.08]} position={[0, 1.25, 0]}>{steelMat}</Box>

        {/* Diagonals posts */}
        <Cylinder args={[0.04, 0.04, 1.4, 8]} position={[-1.9, 0.65, 0]} rotation={[0, 0, -0.6]}>{steelMat}</Cylinder>
        <Cylinder args={[0.04, 0.04, 1.4, 8]} position={[1.9, 0.65, 0]} rotation={[0, 0, 0.6]}>{steelMat}</Cylinder>

        {/* Warren structure panels */}
        <Cylinder args={[0.03, 0.03, 1.25, 8]} position={[-0.9, 0.65, 0]} rotation={[0, 0, 0.6]}>{steelMat}</Cylinder>
        <Cylinder args={[0.03, 0.03, 1.25, 8]} position={[0, 0.65, 0]} rotation={[0, 0, -0.6]}>{steelMat}</Cylinder>
        <Cylinder args={[0.03, 0.03, 1.25, 8]} position={[0.9, 0.65, 0]} rotation={[0, 0, 0.6]}>{steelMat}</Cylinder>

        {/* Verticals pillars */}
        <Cylinder args={[0.035, 0.035, 1.15, 8]} position={[-1.4, 0.65, 0]}>{steelMat}</Cylinder>
        <Cylinder args={[0.035, 0.035, 1.15, 8]} position={[-0.45, 0.65, 0]}>{steelMat}</Cylinder>
        <Cylinder args={[0.035, 0.035, 1.15, 8]} position={[0.45, 0.65, 0]}>{steelMat}</Cylinder>
        <Cylinder args={[0.035, 0.035, 1.15, 8]} position={[1.4, 0.65, 0]}>{steelMat}</Cylinder>

        {/* Gusset Plates (Connection Nodes in Orange) */}
        <Box args={[0.16, 0.16, 0.1]} position={[-2.4, 0.05, 0]}>{connectionMat}</Box>
        <Box args={[0.16, 0.16, 0.1]} position={[-1.4, 0.05, 0]}>{connectionMat}</Box>
        <Box args={[0.16, 0.16, 0.1]} position={[-0.45, 0.05, 0]}>{connectionMat}</Box>
        <Box args={[0.16, 0.16, 0.1]} position={[0.45, 0.05, 0]}>{connectionMat}</Box>
        <Box args={[0.16, 0.16, 0.1]} position={[1.4, 0.05, 0]}>{connectionMat}</Box>
        <Box args={[0.16, 0.16, 0.1]} position={[2.4, 0.05, 0]}>{connectionMat}</Box>

        <Box args={[0.16, 0.16, 0.1]} position={[-1.4, 1.25, 0]}>{connectionMat}</Box>
        <Box args={[0.16, 0.16, 0.1]} position={[-0.45, 1.25, 0]}>{connectionMat}</Box>
        <Box args={[0.16, 0.16, 0.1]} position={[0.45, 1.25, 0]}>{connectionMat}</Box>
        <Box args={[0.16, 0.16, 0.1]} position={[1.4, 1.25, 0]}>{connectionMat}</Box>
      </group>

      {/* Front Truss Line (z = 0.8) */}
      <group position={[0, 0.7, 0.8]}>
        {/* Bottom Chord */}
        <Box args={[5.0, 0.1, 0.08]} position={[0, 0.05, 0]}>{steelMat}</Box>
        {/* Top Chord */}
        <Box args={[3.2, 0.1, 0.08]} position={[0, 1.25, 0]}>{steelMat}</Box>

        {/* Diagonals posts */}
        <Cylinder args={[0.04, 0.04, 1.4, 8]} position={[-1.9, 0.65, 0]} rotation={[0, 0, -0.6]}>{steelMat}</Cylinder>
        <Cylinder args={[0.04, 0.04, 1.4, 8]} position={[1.9, 0.65, 0]} rotation={[0, 0, 0.6]}>{steelMat}</Cylinder>

        {/* Warren structure panels */}
        <Cylinder args={[0.03, 0.03, 1.25, 8]} position={[-0.9, 0.65, 0]} rotation={[0, 0, 0.6]}>{steelMat}</Cylinder>
        <Cylinder args={[0.03, 0.03, 1.25, 8]} position={[0, 0.65, 0]} rotation={[0, 0, -0.6]}>{steelMat}</Cylinder>
        <Cylinder args={[0.03, 0.03, 1.25, 8]} position={[0.9, 0.65, 0]} rotation={[0, 0, 0.6]}>{steelMat}</Cylinder>

        {/* Verticals pillars */}
        <Cylinder args={[0.035, 0.035, 1.15, 8]} position={[-1.4, 0.65, 0]}>{steelMat}</Cylinder>
        <Cylinder args={[0.035, 0.035, 1.15, 8]} position={[-0.45, 0.65, 0]}>{steelMat}</Cylinder>
        <Cylinder args={[0.035, 0.035, 1.15, 8]} position={[0.45, 0.65, 0]}>{steelMat}</Cylinder>
        <Cylinder args={[0.035, 0.035, 1.15, 8]} position={[1.4, 0.65, 0]}>{steelMat}</Cylinder>

        {/* Nodes */}
        <Box args={[0.16, 0.16, 0.1]} position={[-2.4, 0.05, 0]}>{connectionMat}</Box>
        <Box args={[0.16, 0.16, 0.1]} position={[-1.4, 0.05, 0]}>{connectionMat}</Box>
        <Box args={[0.16, 0.16, 0.1]} position={[-0.45, 0.05, 0]}>{connectionMat}</Box>
        <Box args={[0.16, 0.16, 0.1]} position={[0.45, 0.05, 0]}>{connectionMat}</Box>
        <Box args={[0.16, 0.16, 0.1]} position={[1.4, 0.05, 0]}>{connectionMat}</Box>
        <Box args={[0.16, 0.16, 0.1]} position={[2.4, 0.05, 0]}>{connectionMat}</Box>

        <Box args={[0.16, 0.16, 0.1]} position={[-1.4, 1.25, 0]}>{connectionMat}</Box>
        <Box args={[0.16, 0.16, 0.1]} position={[-0.45, 1.25, 0]}>{connectionMat}</Box>
        <Box args={[0.16, 0.16, 0.1]} position={[0.45, 1.25, 0]}>{connectionMat}</Box>
        <Box args={[0.16, 0.16, 0.1]} position={[1.4, 1.25, 0]}>{connectionMat}</Box>
      </group>

      {/* Portal frames cross bracing top chord */}
      <group position={[0, 0.7 + 1.25, 0]}>
        <Box args={[0.05, 0.05, 1.6]} position={[-1.4, 0, 0]}>{steelMat}</Box>
        <Box args={[0.05, 0.05, 1.6]} position={[-0.45, 0, 0]}>{steelMat}</Box>
        <Box args={[0.05, 0.05, 1.6]} position={[0.45, 0, 0]}>{steelMat}</Box>
        <Box args={[0.05, 0.05, 1.6]} position={[1.4, 0, 0]}>{steelMat}</Box>

        {/* X Sway Bracing bars */}
        <Cylinder args={[0.015, 0.015, 1.8, 6]} position={[-0.92, 0, 0]} rotation={[0, Math.PI / 4, 0]}>{steelMat}</Cylinder>
        <Cylinder args={[0.015, 0.015, 1.8, 6]} position={[0, 0, 0]} rotation={[0, -Math.PI / 4, 0]}>{steelMat}</Cylinder>
        <Cylinder args={[0.015, 0.015, 1.8, 6]} position={[0.92, 0, 0]} rotation={[0, Math.PI / 4, 0]}>{steelMat}</Cylinder>
      </group>

      {/* Sparkling Water element under the bridge */}
      <Box args={[5.0, 0.1, 3.0]} position={[0, -0.4, 0]}>
        {waterMat}
      </Box>
    </group>
  );
}

export default function InteractiveSection() {
  const { language } = useLanguage();
  const [selectedModel, setSelectedModel] = useState<'casa' | 'beam' | 'truss'>('casa');
  const [showAR, setShowAR] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);

  const handleScan = () => {
    setIsScanning(true);
    setScanComplete(false);
    setTimeout(() => {
      setIsScanning(false);
      setScanComplete(true);
    }, 3000);
  };

  return (
    <section id="interactivo" className="py-24 px-6 md:px-12 lg:px-24 bg-dark-bg relative bg-grid-pattern">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-4 mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
              {language === 'es' ? 'Laboratorio Interactivo & Visores 3D' : 'Interactive Lab & 3D Visualizers'}
            </h2>
            <div className="h-px bg-white/20 flex-1"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* 3D Viewer */}
            <div className="bg-[#121217] rounded-2xl border border-white/10 overflow-hidden flex flex-col h-[520px] relative">
              <div className="p-4 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-black/40 shrink-0">
                <div className="flex items-center gap-2">
                  <BoxIcon size={18} className="text-zinc-200" />
                  <span className="font-mono font-semibold text-white text-sm">
                    {language === 'es' ? 'Visor de Modelos 3D (CIMOC UniAndes)' : '3D Model Viewer (CIMOC UniAndes)'}
                  </span>
                </div>
                
                {/* Switch toggles */}
                <div className="flex gap-1 bg-white/5 p-1 rounded-lg border border-white/10 text-xs font-mono">
                  <button
                    onClick={() => setSelectedModel('casa')}
                    className={`px-3 py-1 rounded-md transition-all flex items-center gap-1.5 cursor-pointer ${
                      selectedModel === 'casa'
                        ? 'bg-white text-zinc-950 font-bold shadow'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    <Sparkles size={11} className="text-amber-400" />
                    <span>{language === 'es' ? 'Casa Vibratoria' : 'Shake-Table House'}</span>
                  </button>
                  <button
                    onClick={() => setSelectedModel('beam')}
                    className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                      selectedModel === 'beam'
                        ? 'bg-white text-zinc-950 font-bold shadow'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    {language === 'es' ? 'Viga' : 'Beam'}
                  </button>
                  <button
                    onClick={() => setSelectedModel('truss')}
                    className={`px-2.5 py-1 rounded-md transition-all flex items-center gap-1 cursor-pointer ${
                      selectedModel === 'truss'
                        ? 'bg-white text-zinc-950 font-bold shadow'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    {language === 'es' ? 'Puente' : 'Bridge'}
                  </button>
                </div>

                {/* Smartphone Trigger */}
                <button
                  onClick={() => setShowAR(!showAR)}
                  className="flex items-center gap-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 hover:border-amber-500/50 px-3 py-1.5 rounded-lg font-mono text-xs transition-all cursor-pointer"
                >
                  <Smartphone size={13} />
                  <span>{language === 'es' ? 'Ver en AR' : 'AR View'}</span>
                </button>
              </div>

              <div className="flex-1 relative cursor-grab active:cursor-grabbing overflow-hidden">
                {/* AR Popover / Overlay with QR code */}
                <AnimatePresence>
                  {showAR && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="absolute inset-0 bg-slate-950/95 z-20 p-6 flex flex-col items-center justify-center text-center space-y-4 font-sans cursor-default"
                    >
                      <button
                        onClick={() => setShowAR(false)}
                        className="absolute top-4 right-4 p-1.5 rounded-full bg-white/5 hover:bg-white/10 hover:text-red-400 transition-colors cursor-pointer"
                        aria-label="Cerrar modal AR"
                      >
                        <X size={16} />
                      </button>
                      
                      <div className="flex items-center gap-2 bg-amber-500/10 text-amber-400 px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider">
                        <QrCode size={12} />
                        <span>PROYECCIÓN AR MÓVIL / MOBILE AR SCAN</span>
                      </div>

                      <p className="text-white font-bold text-sm max-w-sm">
                        {language === 'es' 
                          ? 'Escanea este plano desde tu teléfono para proyectar la Casa Vibratoria o estructuras en Realidad Aumentada'
                          : 'Scan this blueprint from your phone to project the Shake-Table House in Augmented Reality'}
                      </p>

                      {/* Dynamic QR Code Generator */}
                      <div className="bg-white p-2.5 rounded-xl shadow-lg border border-white/20">
                        <img
                          src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(
                            window.location.href
                          )}`}
                          alt="AR QR Code"
                          className="w-36 h-36"
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      <div className="space-y-1.5 text-xs text-text-muted max-w-xs leading-normal">
                        <p className="font-semibold text-white">
                          {language === 'es' ? 'Instrucciones Rápidas:' : 'Quick Instructions:'}
                        </p>
                        <p>
                          {language === 'es'
                            ? '1. Apunta tu cámara móvil al código QR para abrir el portafolio en tu celular.'
                            : '1. Point your mobile camera at the QR code to open this portfolio.'}
                        </p>
                        <p>
                          {language === 'es'
                            ? '2. Elige la "Casa Vibratoria" o el "Puente" en el visor y utiliza gestos multitouch.'
                            : '2. Select "Shake-Table House" or "Bridge" in the viewer and use multi-touch gestures.'}
                        </p>
                        <p>
                          {language === 'es'
                            ? '3. Proyecta el modelo en tu habitación usando tu cámara móvil compatible.'
                            : '3. Project the model on real environments using your compatible mobile camera.'}
                        </p>
                      </div>

                      <a
                        href="https://ciam-ar.vercel.app"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-400 text-zinc-950 font-mono text-xs font-bold hover:bg-amber-300 transition-all shadow-lg cursor-pointer"
                      >
                        <ExternalLink size={13} />
                        <span>{language === 'es' ? 'Abrir ciamAR en vivo (Vercel)' : 'Open ciamAR Live (Vercel)'}</span>
                      </a>
                    </motion.div>
                  )}
                </AnimatePresence>

                <Canvas shadows camera={{ position: [0, 2, 6], fov: 45 }}>
                  <Suspense fallback={null}>
                    <color attach="background" args={['#0f1015']} />
                    <ambientLight intensity={1.2} />
                    <directionalLight position={[10, 15, 10]} intensity={1.8} castShadow />
                    <directionalLight position={[-10, 10, -10]} intensity={0.9} />
                    <Stage environment={null} intensity={0.7} adjustCamera>
                      {selectedModel === 'casa' && <CasaVibratoriaModel />}
                      {selectedModel === 'beam' && <BeamFailureAnimation />}
                      {selectedModel === 'truss' && <TrussBridgeModel />}
                    </Stage>
                    <OrbitControls 
                      makeDefault 
                      autoRotate={false} 
                      enableZoom={true} 
                      enableDamping={true}
                      dampingFactor={0.06}
                      rotateSpeed={0.8}
                      minDistance={1.2} 
                      maxDistance={25} 
                      maxPolarAngle={Math.PI / 2 + 0.05} 
                    />
                  </Suspense>
                </Canvas>

                {/* Mobile & Desktop 360 Interaction Badge */}
                <div className="absolute bottom-3 left-3 pointer-events-none z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md border border-white/10 text-[11px] font-mono text-zinc-300 shadow-lg">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>{language === 'es' ? 'Arrastra para rotar en 3D' : 'Drag to rotate 3D model'}</span>
                </div>
              </div>
            </div>

            {/* AI Demo */}
            <div className="bg-[#121217] rounded-2xl border border-white/10 overflow-hidden flex flex-col h-[520px]">
              <div className="p-4 border-b border-white/10 flex items-center justify-between bg-black/40 shrink-0">
                <h3 className="font-mono text-zinc-100 flex items-center gap-2 text-sm font-semibold">
                  <ScanLine size={18} className="text-emerald-400" />
                  <span>{language === 'es' ? 'Detección de Fisuras con IA' : 'AI Structural Crack Detection'}</span>
                </h3>
                <span className="text-xs text-zinc-400 bg-white/5 px-2.5 py-1 rounded-full font-mono">
                  {language === 'es' ? 'Visión Computacional' : 'Computer Vision'}
                </span>
              </div>
              
              <div className="flex-1 p-8 flex flex-col items-center justify-center relative">
                <div className="w-full max-w-sm aspect-video bg-black/50 border-2 border-dashed border-white/20 rounded-xl flex flex-col items-center justify-center relative overflow-hidden mb-8 group hover:border-white/40 transition-colors">
                  
                  {isScanning && (
                    <motion.div 
                      className="absolute inset-0 bg-emerald-400/20 z-20"
                      initial={{ top: 0, height: "2px" }}
                      animate={{ top: "100%" }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    />
                  )}

                  {scanComplete ? (
                    <div className="absolute inset-0 z-10">
                      <img 
                        src="https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?q=80&w=800&auto=format&fit=crop" 
                        alt="Pared con grietas" 
                        className="w-full h-full object-cover opacity-60"
                        referrerPolicy="no-referrer"
                      />
                      {/* Crack detection bounding boxes */}
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="absolute top-1/4 left-1/3 w-16 h-24 border-2 border-emerald-400 bg-emerald-500/20 rounded"
                      />
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="absolute bottom-1/3 right-1/4 w-20 h-12 border-2 border-emerald-400 bg-emerald-500/20 rounded"
                      />
                    </div>
                  ) : (
                    <div className="text-center z-10 text-zinc-400 group-hover:text-zinc-200 transition-colors">
                      <Upload size={40} className="mx-auto mb-3 opacity-60" />
                      <p className="font-mono text-xs sm:text-sm">
                        {language === 'es' ? 'Muestra de Concreto para Peritaje' : 'Concrete Sample for Structural Audit'}
                      </p>
                    </div>
                  )}
                </div>

                <button 
                  onClick={handleScan}
                  disabled={isScanning}
                  className={`w-full max-w-sm py-3.5 px-4 rounded-xl font-mono text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg ${
                    isScanning 
                      ? 'bg-black/60 text-emerald-300 border border-emerald-500/40' 
                      : scanComplete 
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 hover:bg-emerald-500/30' 
                        : 'bg-white text-zinc-950 hover:bg-zinc-200'
                  }`}
                >
                  {isScanning ? (
                    <><ScanLine size={18} className="animate-spin text-emerald-400" /> {language === 'es' ? 'Analizando superficie...' : 'Analyzing surface...'}</>
                  ) : scanComplete ? (
                    <><CheckCircle size={18} className="text-emerald-400" /> {language === 'es' ? 'Fisuras Identificadas (Precisión 96.4%)' : 'Cracks Identified (96.4% Accuracy)'}</>
                  ) : (
                    <><ScanLine size={18} /> {language === 'es' ? 'Simular Detección de Fisuras' : 'Simulate Crack Detection'}</>
                  )}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
