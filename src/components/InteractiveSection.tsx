import { motion } from 'motion/react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stage, Box, Cylinder, Text, Edges } from '@react-three/drei';
import { useState, useRef, Suspense } from 'react';
import { Upload, ScanLine, CheckCircle, Box as BoxIcon, Activity } from 'lucide-react';
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

export default function InteractiveSection() {
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
            <h2 className="text-3xl md:text-5xl font-bold text-white">Útiles dentro de la Web</h2>
            <div className="h-px bg-white/20 flex-1"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* 3D Viewer */}
            <div className="bg-dark-surface rounded-2xl border border-white/10 overflow-hidden flex flex-col h-[500px]">
              <div className="p-4 border-b border-white/10 flex items-center justify-between bg-black/20">
                <h3 className="font-mono text-tech-blue flex items-center gap-2">
                  <BoxIcon size={18} /> Visor de Modelos 3D
                </h3>
                <span className="text-xs text-text-muted bg-white/5 px-2 py-1 rounded">Interactúa (Arrastra para rotar)</span>
              </div>
              <div className="flex-1 relative cursor-grab active:cursor-grabbing">
                <Canvas shadows camera={{ position: [0, 0, 8], fov: 50 }}>
                  <Suspense fallback={null}>
                    <color attach="background" args={['#1a1a1a']} />
                    <ambientLight intensity={0.5} />
                    <directionalLight position={[10, 10, 10]} intensity={1} castShadow />
                    <Stage environment="city" intensity={0.5}>
                      <BeamFailureAnimation />
                    </Stage>
                    <OrbitControls autoRotate autoRotateSpeed={1} enableZoom={false} maxPolarAngle={Math.PI / 2} />
                  </Suspense>
                </Canvas>
              </div>
            </div>

            {/* AI Demo */}
            <div className="bg-dark-surface rounded-2xl border border-white/10 overflow-hidden flex flex-col h-[500px]">
              <div className="p-4 border-b border-white/10 flex items-center justify-between bg-black/20">
                <h3 className="font-mono text-neon-blue flex items-center gap-2">
                  <ScanLine size={18} /> Demo de IA (Mockup)
                </h3>
                <span className="text-xs text-text-muted bg-white/5 px-2 py-1 rounded">Detección de Grietas</span>
              </div>
              
              <div className="flex-1 p-8 flex flex-col items-center justify-center relative">
                <div className="w-full max-w-sm aspect-video bg-dark-bg border-2 border-dashed border-white/20 rounded-xl flex flex-col items-center justify-center relative overflow-hidden mb-8 group hover:border-tech-blue transition-colors">
                  
                  {isScanning && (
                    <motion.div 
                      className="absolute inset-0 bg-tech-blue/20 z-20"
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
                        className="w-full h-full object-cover opacity-50"
                        referrerPolicy="no-referrer"
                      />
                      {/* Mockup crack detection boxes */}
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="absolute top-1/4 left-1/3 w-16 h-24 border-2 border-red-500 bg-red-500/20"
                      />
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="absolute bottom-1/3 right-1/4 w-20 h-12 border-2 border-red-500 bg-red-500/20"
                      />
                    </div>
                  ) : (
                    <div className="text-center z-10 text-text-muted group-hover:text-tech-blue transition-colors">
                      <Upload size={48} className="mx-auto mb-4 opacity-50" />
                      <p className="font-mono text-sm">Sube una foto de una pared</p>
                    </div>
                  )}
                </div>

                <button 
                  onClick={handleScan}
                  disabled={isScanning}
                  className={`w-full max-w-sm py-3 rounded-lg font-mono font-medium flex items-center justify-center gap-2 transition-all ${
                    isScanning 
                      ? 'bg-dark-bg text-tech-blue border border-tech-blue' 
                      : scanComplete 
                        ? 'bg-green-500/20 text-green-400 border border-green-500/50'
                        : 'bg-tech-blue text-white hover:bg-blue-600'
                  }`}
                >
                  {isScanning ? (
                    <><ScanLine size={18} className="animate-spin" /> Analizando...</>
                  ) : scanComplete ? (
                    <><CheckCircle size={18} /> Grietas Detectadas</>
                  ) : (
                    <><ScanLine size={18} /> Iniciar Detección</>
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
