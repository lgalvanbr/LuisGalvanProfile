import { motion, AnimatePresence } from 'motion/react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stage, Box, Cylinder, Text, Edges } from '@react-three/drei';
import { useState, useRef, Suspense } from 'react';
import { Upload, ScanLine, CheckCircle, Box as BoxIcon, Activity, Smartphone, QrCode, X, Sparkles } from 'lucide-react';
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

function EiffelTowerModel() {
  const beaconRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (beaconRef.current) {
      beaconRef.current.rotation.y = clock.getElapsedTime() * 1.5;
    }
  });

  return (
    <group position={[0, -2, 0]}>
      {/* Base Arches */}
      <mesh position={[0, 0.45, 0]}>
        <torusGeometry args={[1.2, 0.1, 12, 32, Math.PI]} />
        <meshStandardMaterial color="#475569" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* 4 Leg Pillars (Level 1) */}
      <group>
        {/* Footings */}
        <Box args={[0.6, 0.15, 0.6]} position={[-1.2, 0.075, -1.2]}>
          <meshStandardMaterial color="#334155" roughness={0.9} />
          <Edges scale={1.01} color="#1e293b" />
        </Box>
        <Box args={[0.6, 0.15, 0.6]} position={[1.2, 0.075, -1.2]}>
          <meshStandardMaterial color="#334155" roughness={0.9} />
          <Edges scale={1.01} color="#1e293b" />
        </Box>
        <Box args={[0.6, 0.15, 0.6]} position={[-1.2, 0.075, 1.2]}>
          <meshStandardMaterial color="#334155" roughness={0.9} />
          <Edges scale={1.01} color="#1e293b" />
        </Box>
        <Box args={[0.6, 0.15, 0.6]} position={[1.2, 0.075, 1.2]}>
          <meshStandardMaterial color="#334155" roughness={0.9} />
          <Edges scale={1.01} color="#1e293b" />
        </Box>

        {/* Pillars tilting inwards */}
        <Cylinder args={[0.15, 0.22, 2.2, 8]} position={[-0.9, 1.1, -0.9]} rotation={[0.2, 0, -0.2]}>
          <meshStandardMaterial color="#475569" metalness={0.7} roughness={0.3} />
        </Cylinder>
        <Cylinder args={[0.15, 0.22, 2.2, 8]} position={[0.9, 1.1, -0.9]} rotation={[0.2, 0, 0.2]}>
          <meshStandardMaterial color="#475569" metalness={0.7} roughness={0.3} />
        </Cylinder>
        <Cylinder args={[0.15, 0.22, 2.2, 8]} position={[-0.9, 1.1, 0.9]} rotation={[-0.2, 0, -0.2]}>
          <meshStandardMaterial color="#475569" metalness={0.7} roughness={0.3} />
        </Cylinder>
        <Cylinder args={[0.15, 0.22, 2.2, 8]} position={[0.9, 1.1, 0.9]} rotation={[-0.2, 0, 0.2]}>
          <meshStandardMaterial color="#475569" metalness={0.7} roughness={0.3} />
        </Cylinder>
      </group>

      {/* First Platform */}
      <Box args={[2.0, 0.15, 2.0]} position={[0, 2.1, 0]}>
        <meshStandardMaterial color="#334155" metalness={0.7} roughness={0.3} />
        <Edges color="#1e293b" />
      </Box>

      {/* Level 2 Pillars */}
      <group>
        <Cylinder args={[0.1, 0.15, 1.8, 8]} position={[-0.6, 2.9, -0.6]} rotation={[0.1, 0, -0.1]}>
          <meshStandardMaterial color="#475569" metalness={0.7} roughness={0.3} />
        </Cylinder>
        <Cylinder args={[0.1, 0.15, 1.8, 8]} position={[0.6, 2.9, -0.6]} rotation={[0.1, 0, 0.1]}>
          <meshStandardMaterial color="#475569" metalness={0.7} roughness={0.3} />
        </Cylinder>
        <Cylinder args={[0.1, 0.15, 1.8, 8]} position={[-0.6, 2.9, 0.6]} rotation={[-0.1, 0, -0.1]}>
          <meshStandardMaterial color="#475569" metalness={0.7} roughness={0.3} />
        </Cylinder>
        <Cylinder args={[0.1, 0.15, 1.8, 8]} position={[0.6, 2.9, 0.6]} rotation={[-0.1, 0, 0.1]}>
          <meshStandardMaterial color="#475569" metalness={0.7} roughness={0.3} />
        </Cylinder>
      </group>

      {/* Second Platform */}
      <Box args={[1.3, 0.12, 1.3]} position={[0, 3.8, 0]}>
        <meshStandardMaterial color="#334155" metalness={0.7} roughness={0.3} />
        <Edges color="#1e293b" />
      </Box>

      {/* Dome and Spire */}
      <group>
        <Cylinder args={[0.04, 0.1, 2.2, 8]} position={[0, 4.9, 0]}>
          <meshStandardMaterial color="#475569" metalness={0.7} roughness={0.3} />
        </Cylinder>
        
        {/* Decorative Ring */}
        <Cylinder args={[0.18, 0.18, 0.12, 12]} position={[0, 4.2, 0]}>
          <meshStandardMaterial color="#ef4444" metalness={0.7} roughness={0.3} />
        </Cylinder>

        {/* Tip Spire */}
        <Cylinder args={[0.005, 0.02, 1.2, 8]} position={[0, 6.4, 0]}>
          <meshStandardMaterial color="#94a3b8" metalness={0.8} roughness={0.2} />
        </Cylinder>
      </group>

      {/* Glowing lighthouse beacon */}
      <group ref={beaconRef} position={[0, 7.0, 0]}>
        <mesh>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
        
        {/* Visual helper scanner lines */}
        <Cylinder args={[0.01, 0.15, 6, 12]} position={[0, 0, 3]} rotation={[Math.PI / 2, 0, 0]}>
          <meshBasicMaterial color="#3b82f6" transparent opacity={0.3} />
        </Cylinder>
      </group>

      {/* Floor base */}
      <Box args={[6, 0.05, 6]} position={[0, -0.05, 0]}>
        <meshStandardMaterial color="#18181b" />
        <gridHelper args={[6, 12, "#3f3f46", "#18181b"]} position={[0, 0.03, 0]} />
      </Box>
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
  const [selectedModel, setSelectedModel] = useState<'beam' | 'eiffel' | 'truss'>('beam');
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
            <h2 className="text-3xl md:text-5xl font-bold text-white">Útiles dentro de la Web</h2>
            <div className="h-px bg-white/20 flex-1"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* 3D Viewer */}
            <div className="bg-dark-surface rounded-2xl border border-white/10 overflow-hidden flex flex-col h-[520px] relative">
              <div className="p-4 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-black/20 shrink-0">
                <div className="flex items-center gap-2">
                  <BoxIcon size={18} className="text-tech-blue" />
                  <span className="font-mono font-bold text-white text-sm">Visor de Modelos 3D</span>
                </div>
                
                {/* Switch toggles */}
                <div className="flex gap-1 bg-white/5 p-1 rounded-lg border border-white/10 text-xs font-mono">
                  <button
                    onClick={() => setSelectedModel('beam')}
                    className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                      selectedModel === 'beam'
                        ? 'bg-tech-blue text-white shadow font-semibold'
                        : 'text-text-muted hover:text-white'
                    }`}
                  >
                    {language === 'es' ? 'Viga' : 'Beam'}
                  </button>
                  <button
                    onClick={() => setSelectedModel('eiffel')}
                    className={`px-2.5 py-1 rounded-md transition-all flex items-center gap-1 cursor-pointer ${
                      selectedModel === 'eiffel'
                        ? 'bg-tech-blue text-white shadow font-semibold'
                        : 'text-text-muted hover:text-white'
                    }`}
                  >
                    <Sparkles size={11} className="text-amber-400" />
                    {language === 'es' ? 'Torre Eiffel' : 'Eiffel Tower'}
                  </button>
                  <button
                    onClick={() => setSelectedModel('truss')}
                    className={`px-2.5 py-1 rounded-md transition-all flex items-center gap-1 cursor-pointer ${
                      selectedModel === 'truss'
                        ? 'bg-tech-blue text-white shadow font-semibold'
                        : 'text-text-muted hover:text-white'
                    }`}
                  >
                    {language === 'es' ? 'Puente' : 'Bridge'}
                  </button>
                </div>

                {/* Smartphone Trigger */}
                <button
                  onClick={() => setShowAR(!showAR)}
                  className="flex items-center gap-1 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/20 hover:border-amber-500/30 px-3 py-1.5 rounded-lg font-mono text-xs transition-all cursor-pointer"
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
                          ? 'Escanea este plano desde tu teléfono para proyectar estructuras famosas en Realidad Aumentada'
                          : 'Scan this blueprint from your phone to project famous civil models in Augmented Reality'}
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
                            ? '2. Elige la "Torre Eiffel" o el "Puente" en el visor y utiliza gestos multitouch.'
                            : '2. Select "Torre Eiffel" or "Bridge" in the viewer and use multi-touch gestures.'}
                        </p>
                        <p>
                          {language === 'es'
                            ? '3. Proyecta el modelo en tu habitación usando tu cámara móvil compatible.'
                            : '3. Project the model on real environments using your compatible mobile camera.'}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <Canvas shadows camera={{ position: [0, 0, 8], fov: 50 }}>
                  <Suspense fallback={null}>
                    <color attach="background" args={['#1a1a1a']} />
                    <ambientLight intensity={0.8} />
                    <directionalLight position={[10, 10, 10]} intensity={1.5} castShadow />
                    <Stage environment={null} intensity={0.5}>
                      {selectedModel === 'beam' && <BeamFailureAnimation />}
                      {selectedModel === 'eiffel' && <EiffelTowerModel />}
                      {selectedModel === 'truss' && <TrussBridgeModel />}
                    </Stage>
                    <OrbitControls autoRotate autoRotateSpeed={1} enableZoom={false} maxPolarAngle={Math.PI / 2} />
                  </Suspense>
                </Canvas>
              </div>
            </div>

            {/* AI Demo */}
            <div className="bg-dark-surface rounded-2xl border border-white/10 overflow-hidden flex flex-col h-[520px]">
              <div className="p-4 border-b border-white/10 flex items-center justify-between bg-black/20 shrink-0">
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
                  className={`w-full max-w-sm py-3 rounded-lg font-mono font-medium flex items-center justify-center gap-2 transition-all cursor-pointer ${
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
