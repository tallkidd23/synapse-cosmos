// SYNAPSE COSMOS: FACTOR 11 (3D VOLUMETRIC GRAVITATIONAL WAVE ENGINE)
// True 3D Spherical Wavefront Radiation, Quadrupole Spacetime Strain, 3D Keplerian Spiral Disks,
// Reactive Chemical Spectroscopy, Interactive Gravity Well Probes, Supernova Click-Ignition,
// and 8-Bit Web Audio Gravitational Sonification in pure IBM-PC CP437 ASCII / 16-Color CGA.

(function () {
  'use strict';

  const canvas = document.getElementById('reefCanvas');
  const ctx = canvas.getContext('2d');

  let width = 0;
  let height = 0;
  let dpr = window.devicePixelRatio || 1;

  const CHAR_W = 10;
  const CHAR_H = 14;

  const CGA = {
    BLACK: '#000000',
    BLUE: '#0000AA',
    GREEN: '#00AA00',
    CYAN: '#00AAAA',
    RED: '#AA0000',
    MAGENTA: '#AA00AA',
    BROWN: '#AA5500',
    LIGHT_GRAY: '#AAAAAA',
    DARK_GRAY: '#555555',
    LIGHT_BLUE: '#5555FF',
    LIGHT_GREEN: '#55FF55',
    LIGHT_CYAN: '#55FFFF',
    LIGHT_RED: '#FF5555',
    LIGHT_MAGENTA: '#FF55FF',
    YELLOW: '#FFFF55',
    WHITE: '#FFFFFF'
  };

  const COSMIC_EPOCHS = [
    { name: 'PRIMORDIAL DAWN', uvFlux: 1.4, tempK: 3200, color: CGA.LIGHT_BLUE },
    { name: 'STARBURST ACCRETION', uvFlux: 1.8, tempK: 12000, color: CGA.LIGHT_CYAN },
    { name: 'SUPERNOVA CRUCIBLE', uvFlux: 0.7, tempK: 85000, color: CGA.YELLOW },
    { name: 'QUASAR RELATIVISTIC', uvFlux: 2.4, tempK: 240000, color: CGA.LIGHT_MAGENTA }
  ];

  const STELLAR_CLASSES = [
    { name: 'Pop-III Blue Hypergiant', char: '☼', color: CGA.LIGHT_BLUE, flash: CGA.WHITE, mass: 60.0 },
    { name: 'Pop-II H-II Starburst Hub', char: 'ж', color: CGA.LIGHT_MAGENTA, flash: CGA.WHITE, mass: 35.0 },
    { name: 'Pop-I Protostellar Core', char: '▲', color: CGA.YELLOW, flash: CGA.WHITE, mass: 12.0 },
    { name: 'Relativistic Magnetar', char: '♦', color: CGA.LIGHT_GREEN, flash: CGA.WHITE, mass: 2.4 }
  ];

  function createRNG(seed) {
    let s = seed >>> 0;
    return function () {
      s |= 0;
      s = (s + 0x6D2B79F5) | 0;
      let t = Math.imul(s ^ (s >>> 15), 1 | s);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  // --- Web Audio 8-Bit Analog Synthesizer ---
  let audioCtx = null;
  let isAudioEnabled = false;

  function initAudio() {
    if (audioCtx) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContext();
      isAudioEnabled = true;
    } catch (e) {
      console.warn('Web Audio not supported', e);
    }
  }

  function playPulsarChirp(freq) {
    if (!audioCtx || !isAudioEnabled) return;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq || 440, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(80, audioCtx.currentTime + 0.08);
    gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.08);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.08);
  }

  function playGravitationalWaveRumble() {
    if (!audioCtx || !isAudioEnabled) return;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(55, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(150, audioCtx.currentTime + 0.28);
    gain.gain.setValueAtTime(0.14, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.38);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.38);
  }

  function playSupernovaExplosion() {
    if (!audioCtx || !isAudioEnabled) return;
    const bufferSize = audioCtx.sampleRate * 0.45;
    const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.25));
    }
    const noise = audioCtx.createBufferSource();
    noise.buffer = buffer;
    const gain = audioCtx.createGain();
    gain.gain.setValueAtTime(0.18, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.45);
    noise.connect(gain);
    gain.connect(audioCtx.destination);
    noise.start();
  }

  // --- Dimension-X Camera, Time-Warp & Projection State ---
  let layoutMode = '2x2';
  let focusedSectorIdx = 0;
  let isPaused = false;
  let showSpectroscopyHUD = true;
  let lastFpsUpdate = performance.now();
  let frameCount = 0;
  let currentFps = 60;

  let timeWarp = 1.0;
  const TIME_WARP_LEVELS = [0.1, 0.5, 1.0, 2.5, 5.0, 10.0, 25.0];
  let timeWarpIdx = 2;

  // 3D Orbit Camera Angles & Zoom
  let camPitch = 0.55;
  let camYaw = 0.0;
  let camDistance = 46.0;
  let isDragging = false;
  let lastMouseX = 0;
  let lastMouseY = 0;

  let activeGravityProbe = null;

  // Inter-Universal Wormhole Nodes
  const wormholeNodes = [
    { fromSector: 0, toSector: 1, x: 14.0, y: -6.0, z: 0.0, spin: 0 },
    { fromSector: 1, toSector: 2, x: -14.0, y: 10.0, z: 0.0, spin: 0 },
    { fromSector: 2, toSector: 3, x: 16.0, y: 8.0, z: 0.0, spin: 0 },
    { fromSector: 3, toSector: 0, x: -12.0, y: -8.0, z: 0.0, spin: 0 }
  ];

  const transitSparks = [];

  class UniverseSector3DGW {
    constructor(idx, id, name, seed) {
      this.sectorIdx = idx;
      this.id = id;
      this.name = name;
      this.seed = seed;
      this.rng = createRNG(seed);

      // Reactive Chemical Spectroscopy Metrics
      this.spectroscopy = { H: 0.74, He: 0.24, CNO: 0.015, Fe: 0.005 };
      this.supernovaCount = 0;

      this.epochTime = idx * 1.57;

      // 3D Entities
      this.stellarCores = [];
      this.accretionSwarm = [];
      this.supermassiveHoles = [];
      this.relativisticJets = [];
      this.cosmicDust = [];
      this.volumetricNebula = [];
      
      // 3D Volumetric Spherical Gravitational Waves Pool
      this.sphericalGravWaves = [];

      this.maxStars = 75;
      this.initFields();
      this.reseed();
    }

    initFields() {
      this.cosmicDust = [];
      const dustGlyphs = ['.', '·', '°', '*'];
      for (let i = 0; i < 40; i++) {
        this.cosmicDust.push({
          x: (this.rng() - 0.5) * 48.0,
          y: (this.rng() - 0.5) * 48.0,
          z: (this.rng() - 0.5) * 20.0,
          char: dustGlyphs[Math.floor(this.rng() * dustGlyphs.length)],
          twinkle: this.rng() * Math.PI * 2
        });
      }
    }

    resize(cols, rows) {}

    triggerSphericalGravWave(originX, originY, originZ, amplitude) {
      this.sphericalGravWaves.push({
        x: originX,
        y: originY,
        z: originZ,
        radius: 0.5,
        speed: 0.95,
        maxRadius: 28.0,
        amplitude: amplitude || 3.0,
        life: 1.0
      });
      playGravitationalWaveRumble();
    }

    mutateAccretionGenome(parentGenome) {
      const drift = () => 1.0 + (this.rng() * 0.20 - 0.10);
      return {
        accretionBite: Math.max(1.2, Math.min(5.0, (parentGenome ? parentGenome.accretionBite : 2.8) * drift())),
        gravSense: Math.max(4, Math.min(12, Math.round((parentGenome ? parentGenome.gravSense : 8) * drift()))),
        isDenseIronCore: parentGenome ? (this.rng() < 0.12 ? !parentGenome.isDenseIronCore : parentGenome.isDenseIronCore) : this.rng() < 0.20
      };
    }

    reseed() {
      this.stellarCores = [];
      this.accretionSwarm = [];
      this.supermassiveHoles = [];
      this.relativisticJets = [];
      this.volumetricNebula = [];
      this.sphericalGravWaves = [];
      this.supernovaCount = 0;

      // 1. Central Supermassive Black Hole
      this.supermassiveHoles.push({
        x: 0.0,
        y: 0.0,
        z: 0.0,
        mass: 95.0,
        jetCooldown: 0
      });

      // 2. Dynamic 3D Volumetric Nebula Clouds with Orbital Velocity
      const numClouds = 60;
      for (let i = 0; i < numClouds; i++) {
        const rad = 4.0 + this.rng() * 16.0;
        const arm = (i % 2) * Math.PI;
        const theta = arm + Math.log(rad + 1.0) * 1.8 + (this.rng() - 0.5) * 0.4;
        const vOrbit = Math.sqrt(95.0 * 0.035 / Math.max(rad, 2.0));

        this.volumetricNebula.push({
          r: rad,
          theta: theta,
          z: (this.rng() - 0.5) * (1.2 + rad * 0.08),
          vTheta: vOrbit / rad,
          char: this.rng() < 0.55 ? '%' : '#'
        });
      }

      // 3. Stable 3D Keplerian Spiral Arm Stars
      const starCount = 18;
      for (let k = 0; k < starCount; k++) {
        const rad = 4.5 + (k / (starCount - 1)) * 15.0;
        const armOffset = (k % 2) * Math.PI;
        const ang = armOffset + Math.log(rad + 1.0) * 1.6 + (this.rng() - 0.5) * 0.25;
        const vKepler = Math.sqrt(95.0 * 0.035 / Math.max(rad, 2.0));
        const spIdx = k % STELLAR_CLASSES.length;

        this.stellarCores.push({
          x: Math.cos(ang) * rad,
          y: Math.sin(ang) * rad,
          z: (this.rng() - 0.5) * 1.5,
          vx: -Math.sin(ang) * vKepler,
          vy: Math.cos(ang) * vKepler,
          vz: (this.rng() - 0.5) * 0.02,
          speciesIdx: spIdx,
          fusionEnergy: 16.0,
          age: 0,
          maxAge: 1400 + Math.floor(this.rng() * 600),
          phi: 0.0,
          theta: this.rng() * Math.PI * 2,
          naturalFreq: 0.03 + (this.rng() - 0.5) * 0.01,
          entangledPair: null
        });
      }

      // 4. Stable 3D Accretion Swarm (Planetesimals)
      for (let i = 0; i < 35; i++) {
        const r = 3.0 + this.rng() * 17.0;
        const armOffset = (i % 2) * Math.PI;
        const theta = armOffset + Math.log(r + 1.0) * 1.6 + (this.rng() - 0.5) * 0.4;
        const vOrbit = Math.sqrt(95.0 * 0.035 / Math.max(r, 2.0)) * (0.96 + this.rng() * 0.08);

        this.accretionSwarm.push({
          x: Math.cos(theta) * r,
          y: Math.sin(theta) * r,
          z: (this.rng() - 0.5) * (1.0 + r * 0.06),
          vx: -Math.sin(theta) * vOrbit,
          vy: Math.cos(theta) * vOrbit,
          vz: (this.rng() - 0.5) * 0.04,
          massEnergy: 45.0,
          age: 0,
          genome: this.mutateAccretionGenome(null)
        });
      }

      this.updateSpectroscopyMetrics();
    }

    updateSpectroscopyMetrics() {
      let pop3 = 0, pop2 = 0, pop1 = 0;
      for (let i = 0; i < this.stellarCores.length; i++) {
        const s = this.stellarCores[i];
        if (s.speciesIdx === 0) pop3++;
        else if (s.speciesIdx === 1) pop2++;
        else pop1++;
      }
      const totalStars = Math.max(1, this.stellarCores.length);
      const totalAccretion = this.accretionSwarm.length;

      this.spectroscopy.Fe = Math.min(0.25, 0.005 + (this.supernovaCount * 0.012) + (pop1 / totalStars) * 0.06);
      this.spectroscopy.CNO = Math.min(0.35, 0.015 + (pop2 / totalStars) * 0.14 + (totalAccretion * 0.002));
      this.spectroscopy.He = Math.max(0.18, 0.24 + (pop3 / totalStars) * 0.05);
      this.spectroscopy.H = Math.max(0.30, 1.0 - (this.spectroscopy.He + this.spectroscopy.CNO + this.spectroscopy.Fe));
    }

    triggerSupernovaAt(targetX, targetY) {
      let nearestStar = null, minDist = Infinity;
      for (let i = 0; i < this.stellarCores.length; i++) {
        const star = this.stellarCores[i];
        const d = Math.hypot(star.x - targetX, star.y - targetY);
        if (d < minDist) {
          minDist = d;
          nearestStar = { star, idx: i };
        }
      }
      if (nearestStar && minDist < 12.0) {
        this.triggerSphericalGravWave(nearestStar.star.x, nearestStar.star.y, nearestStar.star.z, 4.5);
        playSupernovaExplosion();
        this.supernovaCount++;
        this.updateSpectroscopyMetrics();
        this.stellarCores.splice(nearestStar.idx, 1);
      }
    }

    update(now, allSectors, dtFactor) {
      this.epochTime += 0.0015 * dtFactor;

      // 1. Swirl Volumetric Gas Nebulae
      for (let i = 0; i < this.volumetricNebula.length; i++) {
        const c = this.volumetricNebula[i];
        c.theta += c.vTheta * dtFactor * 0.6;
      }

      // 2. Propagate 3D Spherical Gravitational Waves
      for (let i = this.sphericalGravWaves.length - 1; i >= 0; i--) {
        const gw = this.sphericalGravWaves[i];
        gw.radius += gw.speed * dtFactor;
        gw.life = Math.max(0.0, 1.0 - gw.radius / gw.maxRadius);

        // Apply Transverse Quadrupole Spacetime Strain (h+ mode) to passing matter
        for (let j = 0; j < this.accretionSwarm.length; j++) {
          const body = this.accretionSwarm[j];
          const dist3D = Math.hypot(body.x - gw.x, body.y - gw.y, body.z - gw.z);
          if (Math.abs(dist3D - gw.radius) < 1.2) {
            const strain = 0.15 * gw.life * dtFactor;
            body.vx -= body.x * strain * 0.1;
            body.vy += body.y * strain * 0.1;
          }
        }

        if (gw.radius >= gw.maxRadius || gw.life <= 0) {
          this.sphericalGravWaves.splice(i, 1);
        }
      }

      const myWormhole = wormholeNodes[this.sectorIdx];
      const smbh = this.supermassiveHoles[0];
      const G = 0.035;

      // 3. Keplerian Stellar Dynamics & Kuramoto Pulsar Entanglement
      for (let i = this.stellarCores.length - 1; i >= 0; i--) {
        const star = this.stellarCores[i];
        star.age += dtFactor;
        star.phi = Math.max(0.0, star.phi - 0.04 * dtFactor);

        const dx = smbh.x - star.x;
        const dy = smbh.y - star.y;
        const dz = smbh.z - star.z;
        const r2 = dx * dx + dy * dy + dz * dz + 1.5;
        const r = Math.sqrt(r2);
        const f = (G * smbh.mass) / r2;

        star.vx += (dx / r) * f * dtFactor;
        star.vy += (dy / r) * f * dtFactor;
        star.vz += (dz / r) * f * dtFactor;

        // Interactive Gravity Probe
        if (activeGravityProbe && this.sectorIdx === focusedSectorIdx) {
          const pDx = activeGravityProbe.x - star.x;
          const pDy = activeGravityProbe.y - star.y;
          const pR2 = pDx * pDx + pDy * pDy + 1.0;
          const pF = (3.5 / pR2) * dtFactor;
          star.vx += (pDx / Math.sqrt(pR2)) * pF;
          star.vy += (pDy / Math.sqrt(pR2)) * pF;
        }

        star.x += star.vx * dtFactor;
        star.y += star.vy * dtFactor;
        star.z += star.vz * dtFactor;

        if (star.entangledPair) {
          star.theta += (star.naturalFreq + Math.sin(star.entangledPair.theta - star.theta) * 0.08) * dtFactor;
        } else {
          star.theta += star.naturalFreq * dtFactor;
        }
        star.theta %= (Math.PI * 2);

        if (star.phi > 0.95 && this.rng() < 0.04) {
          playPulsarChirp(300 + star.speciesIdx * 120);
        }

        const dWh = Math.hypot(star.x - myWormhole.x, star.y - myWormhole.y, star.z - myWormhole.z);
        if (dWh < 3.2 && star.fusionEnergy > 15.0 && this.rng() < 0.015) {
          const targetSector = allSectors[myWormhole.toSector];
          if (targetSector && targetSector.stellarCores.length < targetSector.maxStars) {
            const tWh = wormholeNodes[targetSector.sectorIdx];
            const twin = {
              x: tWh.x + (this.rng() - 0.5) * 2.0,
              y: tWh.y + (this.rng() - 0.5) * 2.0,
              z: tWh.z + (this.rng() - 0.5) * 1.5,
              vx: star.vx * 1.05,
              vy: star.vy * 1.05,
              vz: star.vz * 1.05,
              speciesIdx: star.speciesIdx,
              fusionEnergy: 18.0,
              age: 0,
              maxAge: 1400 + Math.floor(this.rng() * 600),
              phi: 1.0,
              theta: star.theta,
              naturalFreq: star.naturalFreq,
              entangledPair: star
            };
            star.entangledPair = twin;
            targetSector.stellarCores.push(twin);
            targetSector.updateSpectroscopyMetrics();
            transitSparks.push({ from: this.sectorIdx, to: targetSector.sectorIdx, progress: 0, color: CGA.LIGHT_MAGENTA });
          }
        }

        if (star.age > star.maxAge) {
          this.triggerSphericalGravWave(star.x, star.y, star.z, 3.5);
          playSupernovaExplosion();
          this.supernovaCount++;
          this.updateSpectroscopyMetrics();
          if (star.entangledPair) star.entangledPair.entangledPair = null;
          this.stellarCores.splice(i, 1);
        }
      }

      // 4. Stable 3D Accretion Swarm (Planetesimals)
      for (let i = this.accretionSwarm.length - 1; i >= 0; i--) {
        const body = this.accretionSwarm[i];
        body.age += dtFactor;

        const dx = smbh.x - body.x;
        const dy = smbh.y - body.y;
        const dz = smbh.z - body.z;
        const r2 = dx * dx + dy * dy + dz * dz + 1.2;
        const r = Math.sqrt(r2);
        const f = (G * smbh.mass) / r2;

        body.vx += (dx / r) * f * dtFactor;
        body.vy += (dy / r) * f * dtFactor;
        body.vz += (dz / r) * f * dtFactor;

        if (activeGravityProbe && this.sectorIdx === focusedSectorIdx) {
          const pDx = activeGravityProbe.x - body.x;
          const pDy = activeGravityProbe.y - body.y;
          const pR2 = pDx * pDx + pDy * pDy + 1.0;
          const pF = (4.0 / pR2) * dtFactor;
          body.vx += (pDx / Math.sqrt(pR2)) * pF;
          body.vy += (pDy / Math.sqrt(pR2)) * pF;
        }

        body.x += body.vx * dtFactor;
        body.y += body.vy * dtFactor;
        body.z += body.vz * dtFactor;

        if (r < 1.4) {
          this.triggerSphericalGravWave(body.x, body.y, body.z, 2.5);
          smbh.mass = Math.min(150.0, smbh.mass + 1.5);
          this.updateSpectroscopyMetrics();
          this.accretionSwarm.splice(i, 1);
          continue;
        }

        const distToWh = Math.hypot(body.x - myWormhole.x, body.y - myWormhole.y, body.z - myWormhole.z);
        if (distToWh < 1.8) {
          const targetSector = allSectors[myWormhole.toSector];
          if (targetSector) {
            const tWh = wormholeNodes[targetSector.sectorIdx];
            this.accretionSwarm.splice(i, 1);
            targetSector.accretionSwarm.push({
              x: tWh.x + (this.rng() - 0.5) * 2.0,
              y: tWh.y + (this.rng() - 0.5) * 2.0,
              z: tWh.z + (this.rng() - 0.5) * 1.5,
              vx: body.vx * 1.1,
              vy: body.vy * 1.1,
              vz: body.vz * 1.1,
              massEnergy: body.massEnergy,
              age: body.age,
              genome: body.genome
            });
            targetSector.updateSpectroscopyMetrics();
            transitSparks.push({ from: this.sectorIdx, to: targetSector.sectorIdx, progress: 0, color: CGA.YELLOW });
            continue;
          }
        }

        if (r > 38.0) {
          this.accretionSwarm.splice(i, 1);
        }
      }

      // 5. Relativistic Bipolar Jets
      if (this.rng() < 0.40 * dtFactor) {
        const jetSpd = 1.9;
        this.relativisticJets.push({
          x: smbh.x, y: smbh.y, z: smbh.z,
          vx: (this.rng() - 0.5) * 0.08,
          vy: (this.rng() - 0.5) * 0.08,
          vz: jetSpd,
          life: 28,
          color: CGA.LIGHT_MAGENTA
        });
        this.relativisticJets.push({
          x: smbh.x, y: smbh.y, z: smbh.z,
          vx: (this.rng() - 0.5) * 0.08,
          vy: (this.rng() - 0.5) * 0.08,
          vz: -jetSpd,
          life: 28,
          color: CGA.LIGHT_CYAN
        });
      }

      for (let i = this.relativisticJets.length - 1; i >= 0; i--) {
        const jet = this.relativisticJets[i];
        jet.x += jet.vx * dtFactor;
        jet.y += jet.vy * dtFactor;
        jet.z += jet.vz * dtFactor;
        jet.life -= dtFactor;
        if (jet.life <= 0) this.relativisticJets.splice(i, 1);
      }
    }

    project(x, y, z, originX, originY, widthPix, heightPix) {
      const cosY = Math.cos(camYaw), sinY = Math.sin(camYaw);
      const cosP = Math.cos(camPitch), sinP = Math.sin(camPitch);

      const x1 = x * cosY - y * sinY;
      const y1 = x * sinY + y * cosY;
      const z1 = z;

      const x2 = x1;
      const y2 = y1 * cosP - z1 * sinP;
      const z2 = y1 * sinP + z1 * cosP;

      const camZ = z2 + camDistance;
      if (camZ <= 1.0) return null;

      const fov = 420.0;
      const screenX = originX + widthPix * 0.5 + (x2 * fov) / camZ;
      const screenY = originY + heightPix * 0.5 + (y2 * fov) / camZ;

      return { x: screenX, y: screenY, depth: camZ };
    }

    render(ctx, originX, originY, widthPix, heightPix) {
      const epochIdx = Math.floor((this.epochTime / (Math.PI * 2)) * COSMIC_EPOCHS.length) % COSMIC_EPOCHS.length;
      const epoch = COSMIC_EPOCHS[epochIdx];

      ctx.strokeStyle = CGA.DARK_GRAY;
      ctx.strokeRect(originX, originY, widthPix, heightPix);

      ctx.fillStyle = CGA.BLACK;
      ctx.fillRect(originX, originY, widthPix, CHAR_H * 2);

      ctx.font = '11px Courier New, monospace';
      ctx.fillStyle = CGA.LIGHT_CYAN;
      const title = `[${this.id}] ${this.name.toUpperCase()} :: ${epoch.name.slice(0, 11)} ST:${this.stellarCores.length} ACC:${this.accretionSwarm.length} 3D-CAM[P:${camPitch.toFixed(2)} Y:${camYaw.toFixed(2)}] WARP:${timeWarp.toFixed(1)}x`;
      ctx.fillText(title, originX + 4, originY + 2);

      const headerLine = '═'.repeat(Math.floor(widthPix / CHAR_W));
      ctx.fillStyle = CGA.DARK_GRAY;
      ctx.fillText(headerLine, originX, originY + CHAR_H);

      // 1. Distant Cosmic Dust
      for (let i = 0; i < this.cosmicDust.length; i++) {
        const d = this.cosmicDust[i];
        const p = this.project(d.x, d.y, d.z, originX, originY, widthPix, heightPix);
        if (p && p.x >= originX && p.x < originX + widthPix && p.y >= originY + CHAR_H * 2 && p.y < originY + heightPix) {
          ctx.fillStyle = p.depth > 50.0 ? CGA.DARK_GRAY : CGA.LIGHT_GRAY;
          ctx.fillText(d.char, p.x, p.y);
        }
      }

      // 2. Dynamic 3D Volumetric Spiral Nebula Clouds
      for (let i = 0; i < this.volumetricNebula.length; i++) {
        const c = this.volumetricNebula[i];
        const cX = Math.cos(c.theta) * c.r;
        const cY = Math.sin(c.theta) * c.r;
        const p = this.project(cX, cY, c.z, originX, originY, widthPix, heightPix);
        if (p && p.x >= originX && p.x < originX + widthPix && p.y >= originY + CHAR_H * 2 && p.y < originY + heightPix) {
          ctx.fillStyle = p.depth > 48.0 ? CGA.DARK_GRAY : epoch.color;
          ctx.fillText(c.char, p.x, p.y);
        }
      }

      // 3. 3D Expanding Spherical Gravitational Wave Shells
      for (let i = 0; i < this.sphericalGravWaves.length; i++) {
        const gw = this.sphericalGravWaves[i];
        const steps = 16;
        for (let a = 0; a < steps; a++) {
          const phi = (a / steps) * Math.PI * 2;
          const wX = gw.x + Math.cos(phi) * gw.radius;
          const wY = gw.y + Math.sin(phi) * gw.radius;
          const wZ = gw.z + Math.sin(phi * 2.0) * (gw.radius * 0.35);

          const p = this.project(wX, wY, wZ, originX, originY, widthPix, heightPix);
          if (p && p.x >= originX && p.x < originX + widthPix && p.y >= originY + CHAR_H * 2 && p.y < originY + heightPix) {
            ctx.fillStyle = gw.life > 0.5 ? CGA.LIGHT_CYAN : CGA.CYAN;
            const glyph = gw.life > 0.6 ? '(' : '~';
            ctx.fillText(glyph, p.x, p.y);
          }
        }
      }

      // 4. Relativistic Bipolar Jets
      for (let i = 0; i < this.relativisticJets.length; i++) {
        const jet = this.relativisticJets[i];
        const p = this.project(jet.x, jet.y, jet.z, originX, originY, widthPix, heightPix);
        if (p && p.x >= originX && p.x < originX + widthPix && p.y >= originY + CHAR_H * 2 && p.y < originY + heightPix) {
          ctx.fillStyle = jet.color;
          ctx.fillText('»', p.x, p.y);
        }
      }

      // 5. 3D Wormhole Nodes
      const myWormhole = wormholeNodes[this.sectorIdx];
      const pWh = this.project(myWormhole.x, myWormhole.y, myWormhole.z, originX, originY, widthPix, heightPix);
      if (pWh && pWh.x >= originX && pWh.x < originX + widthPix && pWh.y >= originY + CHAR_H * 2 && pWh.y < originY + heightPix) {
        myWormhole.spin = (myWormhole.spin + 0.15) % (Math.PI * 2);
        const glyphs = ['☼', '◎', '⦿', '○', '•'];
        const pIdx = Math.floor((Math.sin(myWormhole.spin) * 0.5 + 0.5) * glyphs.length) % glyphs.length;
        ctx.fillStyle = CGA.LIGHT_MAGENTA;
        ctx.fillText(glyphs[pIdx], pWh.x, pWh.y);
        ctx.fillStyle = CGA.LIGHT_CYAN;
        ctx.fillText(`⮞SEC-0${myWormhole.toSector + 1}`, pWh.x - CHAR_W * 2, pWh.y + CHAR_H);
      }

      // 6. 3D Stellar Cores (Pop III / II / I)
      for (let i = 0; i < this.stellarCores.length; i++) {
        const star = this.stellarCores[i];
        const sp = STELLAR_CLASSES[star.speciesIdx] || STELLAR_CLASSES[0];
        const p = this.project(star.x, star.y, star.z, originX, originY, widthPix, heightPix);
        if (p && p.x >= originX && p.x < originX + widthPix && p.y >= originY + CHAR_H * 2 && p.y < originY + heightPix) {
          ctx.fillStyle = star.phi > 0.08 || (star.entangledPair && star.entangledPair.phi > 0.08) ? sp.flash : sp.color;
          ctx.fillText(sp.char, p.x, p.y);
        }
      }

      // 7. 3D Accretion Swarm (Planetesimals & Iron Cores)
      for (let i = 0; i < this.accretionSwarm.length; i++) {
        const body = this.accretionSwarm[i];
        const p = this.project(body.x, body.y, body.z, originX, originY, widthPix, heightPix);
        if (p && p.x >= originX && p.x < originX + widthPix && p.y >= originY + CHAR_H * 2 && p.y < originY + heightPix) {
          let ch = '>';
          if (body.genome && body.genome.isDenseIronCore) {
            ch = '▲';
            ctx.fillStyle = CGA.YELLOW;
          } else {
            ctx.fillStyle = p.depth > 46.0 ? CGA.CYAN : CGA.LIGHT_CYAN;
          }
          ctx.fillText(ch, p.x, p.y);
        }
      }

      // 8. Central Supermassive Black Hole & Einstein Lensing Ring
      const smbh = this.supermassiveHoles[0];
      const pSMBH = this.project(smbh.x, smbh.y, smbh.z, originX, originY, widthPix, heightPix);
      if (pSMBH && pSMBH.x >= originX && pSMBH.x < originX + widthPix && pSMBH.y >= originY + CHAR_H * 2 && pSMBH.y < originY + heightPix) {
        ctx.fillStyle = CGA.LIGHT_CYAN;
        ctx.fillText('◎', pSMBH.x - CHAR_W * 1.5, pSMBH.y - CHAR_H * 0.8);
        ctx.fillText('◎', pSMBH.x + CHAR_W * 0.8, pSMBH.y + CHAR_H * 0.8);
        ctx.fillStyle = CGA.RED;
        ctx.fillText('◄►', pSMBH.x - CHAR_W, pSMBH.y);
      }

      // 9. Interactive Gravity Probe Cursor
      if (activeGravityProbe && this.sectorIdx === focusedSectorIdx) {
        const pProbe = this.project(activeGravityProbe.x, activeGravityProbe.y, 0, originX, originY, widthPix, heightPix);
        if (pProbe && pProbe.x >= originX && pProbe.x < originX + widthPix && pProbe.y >= originY + CHAR_H * 2 && pProbe.y < originY + heightPix) {
          ctx.fillStyle = CGA.WHITE;
          ctx.fillText('☼✛☼', pProbe.x - CHAR_W, pProbe.y);
        }
      }
    }
  }

  const sectors = [
    new UniverseSector3DGW(0, 'SEC-01', 'Pillars of Creation', 0x7A49B2),
    new UniverseSector3DGW(1, 'SEC-02', 'Carina Starburst', 0xC914E3),
    new UniverseSector3DGW(2, 'SEC-03', 'Tarantula Nebula', 0x11DF08),
    new UniverseSector3DGW(3, 'SEC-04', 'Orion Molecular Cloud', 0x88FA20)
  ];

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    dpr = window.devicePixelRatio || 1;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const totalCols = Math.max(30, Math.floor(width / CHAR_W));
    const totalRows = Math.max(20, Math.floor(height / CHAR_H));

    if (layoutMode === '2x2') {
      const qCols = Math.floor(totalCols / 2);
      const qRows = Math.floor((totalRows - 3) / 2);
      sectors.forEach(s => s.resize(qCols, qRows));
    } else if (layoutMode === '1x3') {
      const cCols = Math.floor(totalCols / 3);
      const cRows = totalRows - 3;
      sectors.slice(0, 3).forEach(s => s.resize(cCols, cRows));
    } else {
      sectors[focusedSectorIdx].resize(totalCols, totalRows - 3);
    }
  }

  function renderSpectroscopyOverlay() {
    if (!showSpectroscopyHUD) return;

    const overlayH = CHAR_H * 6;
    const overlayTop = height - CHAR_H * 3 - overlayH;

    ctx.fillStyle = CGA.BLACK;
    ctx.fillRect(0, overlayTop, width, overlayH);
    ctx.strokeStyle = CGA.LIGHT_CYAN;
    ctx.strokeRect(0, overlayTop, width, overlayH);

    ctx.fillStyle = CGA.LIGHT_CYAN;
    ctx.fillText('╔═ [LIVE EMISSION SPECTROSCOPY & CHEMICAL METALLICITY DECOMPOSITION] ═════════════════════════════╗', 10, overlayTop + 4);

    const s = sectors[focusedSectorIdx];
    const spec = s.spectroscopy;
    const bar = (val) => '█'.repeat(Math.max(1, Math.floor(val * 40)));

    ctx.fillStyle = CGA.LIGHT_BLUE;
    ctx.fillText(` [H-ALPHA  740nm] : ${bar(spec.H)} ${(spec.H * 100).toFixed(1)}% (Primordial Neutral H)`, 14, overlayTop + CHAR_H * 1.5);
    ctx.fillStyle = CGA.LIGHT_MAGENTA;
    ctx.fillText(` [O-III    500nm] : ${bar(spec.CNO)} ${(spec.CNO * 100).toFixed(1)}% (Ionized Starburst C/O)`, 14, overlayTop + CHAR_H * 2.7);
    ctx.fillStyle = CGA.YELLOW;
    ctx.fillText(` [FE-II    440nm] : ${bar(spec.Fe)} ${(spec.Fe * 100).toFixed(1)}% (Supernova Rocky Dust)`, 14, overlayTop + CHAR_H * 3.9);
  }

  function renderAsciiInterface() {
    ctx.font = '12px Courier New, monospace';
    ctx.textBaseline = 'top';

    const footerTop = height - CHAR_H * 2.5;
    ctx.fillStyle = CGA.BLACK;
    ctx.fillRect(0, footerTop, width, CHAR_H * 3);

    ctx.fillStyle = CGA.LIGHT_GREEN;
    const divider = '═'.repeat(Math.floor(width / CHAR_W));
    ctx.fillText(divider, 0, footerTop);

    const nav = ` [M] MATRIX: ${layoutMode.toUpperCase()}  |  [< / >] WARP: ${timeWarp.toFixed(1)}x  |  [S] SPECTROSCOPY  |  [L-CLICK] GRAV WELL  |  [R-CLICK] SUPERNOVA  |  FPS: ${currentFps}`;
    ctx.fillText(nav, 0, footerTop + CHAR_H);
  }

  function renderTransitBeams() {
    if (layoutMode !== '2x2') return;

    for (let i = transitSparks.length - 1; i >= 0; i--) {
      const spark = transitSparks[i];
      spark.progress += 0.04 * timeWarp;

      if (spark.progress >= 1.0) {
        transitSparks.splice(i, 1);
        continue;
      }

      const qW = width * 0.5;
      const qH = (height - CHAR_H * 3) * 0.5;

      const fOffX = (spark.from % 2 === 1) ? qW : 0;
      const fOffY = (spark.from >= 2) ? qH : 0;
      const tOffX = (spark.to % 2 === 1) ? qW : 0;
      const tOffY = (spark.to >= 2) ? qH : 0;

      const pFrom = sectors[spark.from].project(wormholeNodes[spark.from].x, wormholeNodes[spark.from].y, wormholeNodes[spark.from].z, fOffX, fOffY, qW, qH);
      const pTo = sectors[spark.to].project(wormholeNodes[spark.to].x, wormholeNodes[spark.to].y, wormholeNodes[spark.to].z, tOffX, tOffY, qW, qH);

      if (pFrom && pTo) {
        const curX = pFrom.x + (pTo.x - pFrom.x) * spark.progress;
        const curY = pFrom.y + (pTo.y - pFrom.y) * spark.progress;
        ctx.fillStyle = spark.color;
        ctx.fillText('✦', curX, curY);
      }
    }
  }

  function loop(now) {
    requestAnimationFrame(loop);

    frameCount++;
    if (now - lastFpsUpdate >= 1000) {
      currentFps = frameCount;
      frameCount = 0;
      lastFpsUpdate = now;
    }

    ctx.fillStyle = CGA.BLACK;
    ctx.fillRect(0, 0, width, height);

    if (!isPaused) {
      sectors.forEach(s => s.update(now, sectors, timeWarp));
    }

    const availH = height - CHAR_H * 3;

    if (layoutMode === '2x2') {
      const qW = width * 0.5;
      const qH = availH * 0.5;
      sectors[0].render(ctx, 0, 0, qW, qH);
      sectors[1].render(ctx, qW, 0, qW, qH);
      sectors[2].render(ctx, 0, qH, qW, qH);
      sectors[3].render(ctx, qW, qH, qW, qH);
      renderTransitBeams();
    } else if (layoutMode === '1x3') {
      const cW = width / 3.0;
      sectors[0].render(ctx, 0, 0, cW, availH);
      sectors[1].render(ctx, cW, 0, cW, availH);
      sectors[2].render(ctx, cW * 2.0, 0, cW, availH);
    } else {
      sectors[focusedSectorIdx].render(ctx, 0, 0, width, availH);
    }

    renderSpectroscopyOverlay();
    renderAsciiInterface();
  }

  function getSimCoordinates(clientX, clientY) {
    let originX = 0, originY = 0, qW = width, qH = height - CHAR_H * 3;
    let targetSector = focusedSectorIdx;

    if (layoutMode === '2x2') {
      qW = width * 0.5;
      qH = (height - CHAR_H * 3) * 0.5;
      const col = clientX >= qW ? 1 : 0;
      const row = clientY >= qH ? 1 : 0;
      targetSector = col + row * 2;
      originX = col * qW;
      originY = row * qH;
    } else if (layoutMode === '1x3') {
      qW = width / 3.0;
      const col = Math.min(2, Math.floor(clientX / qW));
      targetSector = col;
      originX = col * qW;
    }

    const normX = (clientX - (originX + qW * 0.5)) / (qW * 0.5);
    const normY = (clientY - (originY + qH * 0.5)) / (qH * 0.5);
    const scale = (camDistance / 420.0) * 18.0;

    return {
      x: normX * scale,
      y: normY * scale,
      sectorIdx: targetSector
    };
  }

  canvas.addEventListener('mousedown', (e) => {
    initAudio();
    const sim = getSimCoordinates(e.clientX, e.clientY);

    if (e.button === 0) {
      if (e.shiftKey) {
        focusedSectorIdx = sim.sectorIdx;
        activeGravityProbe = { x: sim.x, y: sim.y };
      } else {
        isDragging = true;
        lastMouseX = e.clientX;
        lastMouseY = e.clientY;
      }
    } else if (e.button === 2) {
      e.preventDefault();
      sectors[sim.sectorIdx].triggerSupernovaAt(sim.x, sim.y);
    }
  });

  canvas.addEventListener('contextmenu', (e) => { e.preventDefault(); });

  window.addEventListener('mouseup', () => {
    isDragging = false;
    activeGravityProbe = null;
  });

  canvas.addEventListener('mousemove', (e) => {
    if (activeGravityProbe) {
      const sim = getSimCoordinates(e.clientX, e.clientY);
      activeGravityProbe.x = sim.x;
      activeGravityProbe.y = sim.y;
    } else if (isDragging) {
      const dx = e.clientX - lastMouseX;
      const dy = e.clientY - lastMouseY;
      camYaw += dx * 0.008;
      camPitch = Math.max(-1.3, Math.min(1.3, camPitch + dy * 0.008));
      lastMouseX = e.clientX;
      lastMouseY = e.clientY;
    }
  });

  canvas.addEventListener('wheel', (e) => {
    e.preventDefault();
    camDistance = Math.max(18.0, Math.min(85.0, camDistance + (e.deltaY > 0 ? 3.0 : -3.0)));
  }, { passive: false });

  canvas.addEventListener('touchstart', (e) => {
    initAudio();
    if (e.touches.length === 1) {
      isDragging = true;
      lastMouseX = e.touches[0].clientX;
      lastMouseY = e.touches[0].clientY;
    }
  });

  canvas.addEventListener('touchmove', (e) => {
    if (!isDragging || e.touches.length !== 1) return;
    const dx = e.touches[0].clientX - lastMouseX;
    const dy = e.touches[0].clientY - lastMouseY;
    camYaw += dx * 0.008;
    camPitch = Math.max(-1.3, Math.min(1.3, camPitch + dy * 0.008));
    lastMouseX = e.touches[0].clientX;
    lastMouseY = e.touches[0].clientY;
  });

  canvas.addEventListener('touchend', () => { isDragging = false; });

  window.addEventListener('keydown', (e) => {
    initAudio();
    const key = e.key.toLowerCase();
    if (key === 'm') {
      if (layoutMode === '2x2') layoutMode = '1x3';
      else if (layoutMode === '1x3') layoutMode = '1x1';
      else layoutMode = '2x2';
      resize();
    } else if (key === 's') {
      showSpectroscopyHUD = !showSpectroscopyHUD;
    } else if (key === 'p') {
      isPaused = !isPaused;
    } else if (key === 'r') {
      sectors.forEach(s => s.reseed());
      playSupernovaExplosion();
    } else if (key === '>' || key === '.' || key === ']') {
      timeWarpIdx = Math.min(TIME_WARP_LEVELS.length - 1, timeWarpIdx + 1);
      timeWarp = TIME_WARP_LEVELS[timeWarpIdx];
    } else if (key === '<' || key === ',' || key === '[') {
      timeWarpIdx = Math.max(0, timeWarpIdx - 1);
      timeWarp = TIME_WARP_LEVELS[timeWarpIdx];
    } else if (key === '+' || key === '=') {
      camDistance = Math.max(18.0, camDistance - 4.0);
    } else if (key === '-' || key === '_') {
      camDistance = Math.min(85.0, camDistance + 4.0);
    } else if (key >= '1' && key <= '4') {
      focusedSectorIdx = parseInt(key, 10) - 1;
      layoutMode = '1x1';
      resize();
    }
  });

  window.addEventListener('resize', resize);
  window.addEventListener('orientationchange', resize);

  resize();
  requestAnimationFrame(loop);
})();
