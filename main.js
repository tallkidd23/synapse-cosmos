// SYNAPSE COSMOS: HYPER-DIMENSIONAL ASTROPHYSICAL ENGINE (DIMENSION-X RELEASE)
// True 3D Spacetime Ray-Projection & Matrix Camera Transformation in pure IBM-PC CP437 ASCII / 16-Color CGA.
// Features: Full 3D Accretion Disks, Relativistic Jets, Gravitational Wave Metric Warps, 
// 3D Wormhole Hyper-Funnels, Kuramoto Entanglement, Interactive Camera Orbit, and Live Chemical Spectroscopy HUD.

(function () {
  'use strict';

  const canvas = document.getElementById('reefCanvas');
  const ctx = canvas.getContext('2d');

  let width = 0;
  let height = 0;
  let dpr = window.devicePixelRatio || 1;

  const CHAR_W = 10;
  const CHAR_H = 14;

  // 16-Color CGA Retro Palette
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
    { name: 'PRIMORDIAL DAWN', F: 0.038, k: 0.061, uvFlux: 1.4, tempK: 3200, bgChar: '.', color: CGA.LIGHT_BLUE },
    { name: 'STARBURST ACCRETION', F: 0.046, k: 0.063, uvFlux: 1.8, tempK: 12000, bgChar: ':', color: CGA.LIGHT_CYAN },
    { name: 'SUPERNOVA CRUCIBLE', F: 0.028, k: 0.058, uvFlux: 0.7, tempK: 85000, bgChar: '.', color: CGA.YELLOW },
    { name: 'QUASAR RELATIVISTIC', F: 0.054, k: 0.062, uvFlux: 2.4, tempK: 240000, bgChar: ':', color: CGA.LIGHT_MAGENTA }
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

  // --- Dimension-X Camera & 3D Projection State ---
  let layoutMode = '2x2';
  let focusedSectorIdx = 0;
  let isPaused = false;
  let showSpectroscopyHUD = false;
  let lastFpsUpdate = performance.now();
  let frameCount = 0;
  let currentFps = 60;

  // Camera 3D Orbit Angles
  let camPitch = 0.45; // Elevation angle
  let camYaw = 0.0;    // Azimuth rotation
  let camDistance = 42.0;
  let isDragging = false;
  let lastMouseX = 0;
  let lastMouseY = 0;

  // Inter-Universal Wormhole Nodes
  const wormholeNodes = [
    { fromSector: 0, toSector: 1, x: 12.0, y: -4.0, z: 0.0, spin: 0 },
    { fromSector: 1, toSector: 2, x: -12.0, y: 8.0, z: 0.0, spin: 0 },
    { fromSector: 2, toSector: 3, x: 14.0, y: 6.0, z: 0.0, spin: 0 },
    { fromSector: 3, toSector: 0, x: -10.0, y: -6.0, z: 0.0, spin: 0 }
  ];

  const transitSparks = [];

  class UniverseSector3D {
    constructor(idx, id, name, seed) {
      this.sectorIdx = idx;
      this.id = id;
      this.name = name;
      this.seed = seed;
      this.rng = createRNG(seed);

      this.cols = 40;
      this.rows = 24;
      this.headerRows = 2;
      this.footerRows = 1;

      // 2D/3D Gas Substrates
      this.BaryonGas = null;
      this.StellarDust = null;
      this.GravAlarm = null;
      this.TuringU = null;
      this.TuringV = null;
      this.nextU = null;
      this.nextV = null;
      this.GW_curr = null;
      this.GW_prev = null;
      this.GW_next = null;

      // Chemical Spectroscopy Composition Vectors (H, He, CNO, Fe)
      this.spectroscopy = { H: 0.74, He: 0.24, CNO: 0.015, Fe: 0.005 };

      this.morphCycleTime = 0;
      this.epochTime = idx * 1.57;
      this.globalKuramotoCoupling = 0.04;

      // 3D Astrophysical Entities
      this.stellarCores = [];
      this.accretionSwarm = [];
      this.supermassiveHoles = [];
      this.dustCondensers = [];
      this.relativisticJets = [];
      this.cosmicDust = [];

      this.maxStars = 65;
      this.initFields();
      this.reseed();
    }

    cellIdx(x, y) {
      const cx = ((x % this.cols) + this.cols) % this.cols;
      const cy = ((y % this.rows) + this.rows) % this.rows;
      return cx + cy * this.cols;
    }

    initFields() {
      const total = this.cols * this.rows;
      this.BaryonGas = new Float32Array(total);
      this.StellarDust = new Float32Array(total);
      this.GravAlarm = new Float32Array(total);
      this.TuringU = new Float32Array(total);
      this.TuringV = new Float32Array(total);
      this.nextU = new Float32Array(total);
      this.nextV = new Float32Array(total);
      this.GW_curr = new Float32Array(total);
      this.GW_prev = new Float32Array(total);
      this.GW_next = new Float32Array(total);

      for (let y = 0; y < this.rows; y++) {
        const gravitationalWell = 1.0 + (y / this.rows) * 1.5;
        for (let x = 0; x < this.cols; x++) {
          const i = x + y * this.cols;
          this.BaryonGas[i] = 3.5 + this.rng() * 3.0 * gravitationalWell;
          this.StellarDust[i] = 0.5 * gravitationalWell;
          this.GravAlarm[i] = 0.0;
          this.TuringU[i] = 1.0;
          this.TuringV[i] = 0.0;
          this.GW_curr[i] = 0.0;
          this.GW_prev[i] = 0.0;
          this.GW_next[i] = 0.0;

          if (y > this.headerRows + 3 && Math.hypot(x - this.cols * 0.5, y - this.rows * 0.7) < 4 && this.rng() < 0.035) {
            this.TuringV[i] = 0.8;
          }
        }
      }

      this.cosmicDust = [];
      const dustGlyphs = ['.', '·', '°', '*'];
      for (let i = 0; i < 35; i++) {
        this.cosmicDust.push({
          x: (this.rng() - 0.5) * 32.0,
          y: (this.rng() - 0.5) * 32.0,
          z: (this.rng() - 0.5) * 16.0,
          char: dustGlyphs[Math.floor(this.rng() * dustGlyphs.length)],
          twinkle: this.rng() * Math.PI * 2
        });
      }
    }

    resize(cols, rows) {
      this.cols = Math.max(20, cols);
      this.rows = Math.max(14, rows);
      this.initFields();
      this.reseed();
    }

    triggerGravitationalWave(cx, cy, amplitude) {
      const gx = Math.floor(((cx + 18.0) / 36.0) * this.cols);
      const gy = Math.floor(((cy + 18.0) / 36.0) * (this.rows - 3) + this.headerRows);
      const i = this.cellIdx(gx, gy);
      this.GW_curr[i] += amplitude;
    }

    mutateAccretionGenome(parentGenome) {
      const drift = () => 1.0 + (this.rng() * 0.20 - 0.10);
      return {
        accretionBite: Math.max(1.2, Math.min(5.0, (parentGenome ? parentGenome.accretionBite : 2.8) * drift())),
        gravSense: Math.max(4, Math.min(12, Math.round((parentGenome ? parentGenome.gravSense : 8) * drift()))),
        orbitalVelocity: Math.max(0.40, Math.min(0.90, (parentGenome ? parentGenome.orbitalVelocity : 0.60) * drift())),
        isDenseIronCore: parentGenome ? (this.rng() < 0.12 ? !parentGenome.isDenseIronCore : parentGenome.isDenseIronCore) : this.rng() < 0.20
      };
    }

    reseed() {
      this.stellarCores = [];
      this.accretionSwarm = [];
      this.supermassiveHoles = [];
      this.dustCondensers = [];
      this.relativisticJets = [];

      // 3D Proto-Galaxy Seed
      const rootCount = 6;
      for (let k = 0; k < rootCount; k++) {
        const rad = 3.0 + (k / (rootCount - 1)) * 14.0;
        const ang = (k / rootCount) * Math.PI * 2 + (this.rng() - 0.5) * 0.4;
        const spIdx = k % STELLAR_CLASSES.length;
        const star = {
          x: Math.cos(ang) * rad,
          y: Math.sin(ang) * rad,
          z: (this.rng() - 0.5) * 2.5,
          vx: -Math.sin(ang) * 0.4,
          vy: Math.cos(ang) * 0.4,
          vz: (this.rng() - 0.5) * 0.05,
          speciesIdx: spIdx,
          fusionEnergy: 16.0,
          age: 0,
          maxAge: 1400 + Math.floor(this.rng() * 600),
          phi: 0.0,
          theta: this.rng() * Math.PI * 2,
          naturalFreq: 0.03 + (this.rng() - 0.5) * 0.01,
          entangledPair: null
        };
        this.stellarCores.push(star);
      }

      // 3D Rotating Accretion Disk Swarm
      for (let i = 0; i < 22; i++) {
        const r = 2.0 + this.rng() * 15.0;
        const theta = this.rng() * Math.PI * 2;
        const vOrbit = Math.sqrt(12.0 / Math.max(r, 1.5)) * 0.45;
        this.accretionSwarm.push({
          x: Math.cos(theta) * r,
          y: Math.sin(theta) * r,
          z: (this.rng() - 0.5) * (1.2 + r * 0.08),
          vx: -Math.sin(theta) * vOrbit,
          vy: Math.cos(theta) * vOrbit,
          vz: (this.rng() - 0.5) * 0.08,
          massEnergy: 45.0,
          age: 0,
          genome: this.mutateAccretionGenome(null),
          orbitalVelocity: 0.60
        });
      }

      // Supermassive Black Hole at 3D Galactic Origin
      this.supermassiveHoles.push({
        x: 0.0,
        y: 0.0,
        z: 0.0,
        vx: 0.0,
        vy: 0.0,
        vz: 0.0,
        singularityMass: 85.0,
        cruiseSpeed: 0.45,
        burstSpeed: 1.10,
        isJetSprinting: false,
        jetCooldown: 0,
        jetAngle: 0
      });
    }

    stepSubstrates(epoch) {
      this.morphCycleTime += 0.005;
      const breathing = Math.sin(this.morphCycleTime) * 0.003;
      const F = epoch.F + breathing;
      const k = epoch.k + breathing * 0.5;
      const Du = 0.16;
      const Dv = 0.08;
      const waveSpeedSq = 0.20;
      const waveDamping = 0.96;

      for (let x = 0; x < this.cols; x++) {
        for (let y = this.headerRows; y < this.rows - this.footerRows; y++) {
          const i = this.cellIdx(x, y);

          const u = this.TuringU[i];
          const v = this.TuringV[i];
          const lapU = (this.TuringU[this.cellIdx(x + 1, y)] + this.TuringU[this.cellIdx(x - 1, y)] +
            this.TuringU[this.cellIdx(x, y + 1)] + this.TuringU[this.cellIdx(x, y - 1)]) * 0.25 - u;
          const lapV = (this.TuringV[this.cellIdx(x + 1, y)] + this.TuringV[this.cellIdx(x - 1, y)] +
            this.TuringV[this.cellIdx(x, y + 1)] + this.TuringV[this.cellIdx(x, y - 1)]) * 0.25 - v;

          const localF = F + (this.BaryonGas[i] / 10.0) * 0.006;
          const localK = k + (this.GravAlarm[i] / 8.0) * 0.005;
          const uvv = u * v * v;

          let nU = u + (Du * lapU - uvv + localF * (1.0 - u));
          let nV = v + (Dv * lapV + uvv - (localF + localK) * v);

          this.nextU[i] = Math.max(0.0, Math.min(1.0, nU));
          this.nextV[i] = Math.max(0.0, Math.min(1.0, nV));

          const lapGW = (this.GW_curr[this.cellIdx(x + 1, y)] + this.GW_curr[this.cellIdx(x - 1, y)] +
            this.GW_curr[this.cellIdx(x, y + 1)] + this.GW_curr[this.cellIdx(x, y - 1)]) - 4.0 * this.GW_curr[i];
          let nextGW = (2.0 * this.GW_curr[i] - this.GW_prev[i] + waveSpeedSq * lapGW) * waveDamping;
          this.GW_next[i] = Math.abs(nextGW) < 0.002 ? 0.0 : nextGW;

          this.spectroscopy.Fe = Math.min(0.08, this.spectroscopy.Fe + 0.00001);
          this.spectroscopy.CNO = Math.min(0.12, this.spectroscopy.CNO + 0.00002);
          this.spectroscopy.H = Math.max(0.60, 1.0 - (this.spectroscopy.He + this.spectroscopy.CNO + this.spectroscopy.Fe));
        }
      }

      this.TuringU.set(this.nextU);
      this.TuringV.set(this.nextV);
      this.GW_prev.set(this.GW_curr);
      this.GW_curr.set(this.GW_next);
    }

    update(now, allSectors) {
      this.epochTime += 0.0015;
      const epochIdx = Math.floor((this.epochTime / (Math.PI * 2)) * COSMIC_EPOCHS.length) % COSMIC_EPOCHS.length;
      const epoch = COSMIC_EPOCHS[epochIdx];

      this.globalKuramotoCoupling = Math.max(0.04, this.globalKuramotoCoupling - 0.001);
      this.stepSubstrates(epoch);

      const myWormhole = wormholeNodes[this.sectorIdx];

      // 1. 3D Stellar Dynamics & Fusion
      for (let i = this.stellarCores.length - 1; i >= 0; i--) {
        const star = this.stellarCores[i];
        star.age++;
        star.phi = Math.max(0.0, star.phi - 0.04);

        const r3D = Math.hypot(star.x, star.y, star.z);
        const fGrav = 18.0 / Math.max(r3D * r3D, 2.0);
        star.vx -= (star.x / r3D) * fGrav * 0.02;
        star.vy -= (star.y / r3D) * fGrav * 0.02;
        star.vz -= (star.z / r3D) * fGrav * 0.02;

        star.x += star.vx;
        star.y += star.vy;
        star.z += star.vz;

        if (star.entangledPair) {
          star.theta += (star.naturalFreq + Math.sin(star.entangledPair.theta - star.theta) * 0.08);
        } else {
          star.theta += star.naturalFreq;
        }
        star.theta %= (Math.PI * 2);

        const dWh = Math.hypot(star.x - myWormhole.x, star.y - myWormhole.y, star.z - myWormhole.z);
        if (dWh < 3.2 && star.fusionEnergy > 15.0 && this.rng() < 0.015) {
          const targetSector = allSectors[myWormhole.toSector];
          if (targetSector && targetSector.stellarCores.length < targetSector.maxStars) {
            const tWh = wormholeNodes[targetSector.sectorIdx];
            const twin = {
              x: tWh.x + (this.rng() - 0.5) * 2.0,
              y: tWh.y + (this.rng() - 0.5) * 2.0,
              z: tWh.z + (this.rng() - 0.5) * 1.5,
              vx: star.vx * 1.1,
              vy: star.vy * 1.1,
              vz: star.vz * 1.1,
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
            transitSparks.push({ from: this.sectorIdx, to: targetSector.sectorIdx, progress: 0, color: CGA.LIGHT_MAGENTA });
          }
        }

        if (star.fusionEnergy <= 0 || star.age > star.maxAge) {
          this.triggerGravitationalWave(star.x, star.y, 3.5);
          if (star.entangledPair) star.entangledPair.entangledPair = null;
          this.stellarCores.splice(i, 1);
        }
      }

      // 2. 3D Accretion Swarm Infall
      for (let i = this.accretionSwarm.length - 1; i >= 0; i--) {
        const body = this.accretionSwarm[i];
        body.age++;
        body.massEnergy -= 0.06;

        const r = Math.hypot(body.x, body.y, body.z);
        const fG = 24.0 / Math.max(r * r, 1.5);
        body.vx -= (body.x / r) * fG * 0.02;
        body.vy -= (body.y / r) * fG * 0.02;
        body.vz -= (body.z / r) * fG * 0.02;

        body.x += body.vx;
        body.y += body.vy;
        body.z += body.vz;

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
              vx: body.vx * 1.2,
              vy: body.vy * 1.2,
              vz: body.vz * 1.2,
              massEnergy: body.massEnergy,
              age: body.age,
              genome: body.genome,
              orbitalVelocity: body.orbitalVelocity
            });
            transitSparks.push({ from: this.sectorIdx, to: targetSector.sectorIdx, progress: 0, color: CGA.YELLOW });
            continue;
          }
        }

        if (body.massEnergy <= 0 || r > 35.0) {
          this.accretionSwarm.splice(i, 1);
        }
      }

      // 3. Supermassive Black Holes & 3D Relativistic Jets
      for (let i = this.supermassiveHoles.length - 1; i >= 0; i--) {
        const hole = this.supermassiveHoles[i];
        hole.singularityMass -= 0.28;

        if (this.rng() < 0.35) {
          const jetSpd = 1.8;
          this.relativisticJets.push({
            x: hole.x, y: hole.y, z: hole.z,
            vx: (this.rng() - 0.5) * 0.1,
            vy: (this.rng() - 0.5) * 0.1,
            vz: jetSpd,
            life: 25,
            color: CGA.LIGHT_MAGENTA
          });
          this.relativisticJets.push({
            x: hole.x, y: hole.y, z: hole.z,
            vx: (this.rng() - 0.5) * 0.1,
            vy: (this.rng() - 0.5) * 0.1,
            vz: -jetSpd,
            life: 25,
            color: CGA.LIGHT_CYAN
          });
        }
      }

      // 4. Update 3D Jets
      for (let i = this.relativisticJets.length - 1; i >= 0; i--) {
        const jet = this.relativisticJets[i];
        jet.x += jet.vx;
        jet.y += jet.vy;
        jet.z += jet.vz;
        jet.life--;
        if (jet.life <= 0) this.relativisticJets.splice(i, 1);
      }
    }

    // 3D-to-2D Perspective Ray-Projection Engine
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

      const fov = 380.0;
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
      const title = `[${this.id}] ${this.name.toUpperCase()} :: ${epoch.name.slice(0, 11)} ST:${this.stellarCores.length} ACC:${this.accretionSwarm.length} 3D-CAM[P:${camPitch.toFixed(2)} Y:${camYaw.toFixed(2)}]`;
      ctx.fillText(title, originX + 4, originY + 2);

      const headerLine = '═'.repeat(Math.floor(widthPix / CHAR_W));
      ctx.fillStyle = CGA.DARK_GRAY;
      ctx.fillText(headerLine, originX, originY + CHAR_H);

      // 1. Render Cosmic Microwave Background Dust with Depth Z-shading
      for (let i = 0; i < this.cosmicDust.length; i++) {
        const d = this.cosmicDust[i];
        const p = this.project(d.x, d.y, d.z, originX, originY, widthPix, heightPix);
        if (p && p.x >= originX && p.x < originX + widthPix && p.y >= originY + CHAR_H * 2 && p.y < originY + heightPix) {
          ctx.fillStyle = p.depth > 45.0 ? CGA.DARK_GRAY : CGA.LIGHT_GRAY;
          ctx.fillText(d.char, p.x, p.y);
        }
      }

      // 2. Render 3D Relativistic Jets
      for (let i = 0; i < this.relativisticJets.length; i++) {
        const jet = this.relativisticJets[i];
        const p = this.project(jet.x, jet.y, jet.z, originX, originY, widthPix, heightPix);
        if (p && p.x >= originX && p.x < originX + widthPix && p.y >= originY + CHAR_H * 2 && p.y < originY + heightPix) {
          ctx.fillStyle = jet.color;
          ctx.fillText('»', p.x, p.y);
        }
      }

      // 3. Render 3D Wormhole Hyper-Funnel
      const myWormhole = wormholeNodes[this.sectorIdx];
      const pWh = this.project(myWormhole.x, myWormhole.y, myWormhole.z, originX, originY, widthPix, heightPix);
      if (pWh) {
        myWormhole.spin = (myWormhole.spin + 0.15) % (Math.PI * 2);
        const glyphs = ['☼', '◎', '⦿', '○', '•'];
        const pIdx = Math.floor((Math.sin(myWormhole.spin) * 0.5 + 0.5) * glyphs.length) % glyphs.length;
        ctx.fillStyle = CGA.LIGHT_MAGENTA;
        ctx.fillText(glyphs[pIdx], pWh.x, pWh.y);
        ctx.fillStyle = CGA.LIGHT_CYAN;
        ctx.fillText(`⮞SEC-0${myWormhole.toSector + 1}`, pWh.x - CHAR_W * 2, pWh.y + CHAR_H);
      }

      // 4. Render 3D Stellar Cores
      for (let i = 0; i < this.stellarCores.length; i++) {
        const star = this.stellarCores[i];
        const sp = STELLAR_CLASSES[star.speciesIdx] || STELLAR_CLASSES[0];
        const p = this.project(star.x, star.y, star.z, originX, originY, widthPix, heightPix);
        if (p && p.x >= originX && p.x < originX + widthPix && p.y >= originY + CHAR_H * 2 && p.y < originY + heightPix) {
          ctx.fillStyle = star.phi > 0.08 || (star.entangledPair && star.entangledPair.phi > 0.08) ? sp.flash : sp.color;
          ctx.fillText(sp.char, p.x, p.y);
        }
      }

      // 5. Render 3D Accretion Swarm Planetesimals
      for (let i = 0; i < this.accretionSwarm.length; i++) {
        const body = this.accretionSwarm[i];
        const p = this.project(body.x, body.y, body.z, originX, originY, widthPix, heightPix);
        if (p && p.x >= originX && p.x < originX + widthPix && p.y >= originY + CHAR_H * 2 && p.y < originY + heightPix) {
          let ch = '>';
          if (body.genome && body.genome.isDenseIronCore) {
            ch = '▲';
            ctx.fillStyle = CGA.YELLOW;
          } else {
            ctx.fillStyle = p.depth > 42.0 ? CGA.CYAN : CGA.LIGHT_CYAN;
          }
          ctx.fillText(ch, p.x, p.y);
        }
      }

      // 6. Supermassive Black Hole Singularity at Origin
      for (let i = 0; i < this.supermassiveHoles.length; i++) {
        const hole = this.supermassiveHoles[i];
        const p = this.project(hole.x, hole.y, hole.z, originX, originY, widthPix, heightPix);
        if (p) {
          ctx.fillStyle = CGA.RED;
          ctx.fillText('◄►', p.x - CHAR_W, p.y);
        }
      }
    }
  }

  const sectors = [
    new UniverseSector3D(0, 'SEC-01', 'Pillars of Creation', 0x7A49B2),
    new UniverseSector3D(1, 'SEC-02', 'Carina Starburst', 0xC914E3),
    new UniverseSector3D(2, 'SEC-03', 'Tarantula Nebula', 0x11DF08),
    new UniverseSector3D(3, 'SEC-04', 'Orion Molecular Cloud', 0x88FA20)
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
    const bar = (val) => '█'.repeat(Math.floor(val * 40));

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

    const nav = ` [M] MATRIX: ${layoutMode.toUpperCase()}  |  [S] SPECTROSCOPY HUD  |  [DRAG] 3D-ORBIT  |  [P] ${isPaused ? 'RESUME' : 'PAUSE'}  |  [R] BIG BANG  |  FPS: ${currentFps}`;
    ctx.fillText(nav, 0, footerTop + CHAR_H);
  }

  function renderTransitBeams() {
    if (layoutMode !== '2x2') return;

    for (let i = transitSparks.length - 1; i >= 0; i--) {
      const spark = transitSparks[i];
      spark.progress += 0.04;

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
      sectors.forEach(s => s.update(now, sectors));
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

  // --- Interactive Mouse 3D Camera Orbit ---
  canvas.addEventListener('mousedown', (e) => {
    isDragging = true;
    lastMouseX = e.clientX;
    lastMouseY = e.clientY;
  });

  window.addEventListener('mouseup', () => { isDragging = false; });

  canvas.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const dx = e.clientX - lastMouseX;
    const dy = e.clientY - lastMouseY;
    camYaw += dx * 0.008;
    camPitch = Math.max(-1.2, Math.min(1.2, camPitch + dy * 0.008));
    lastMouseX = e.clientX;
    lastMouseY = e.clientY;
  });

  // Touch Support for Mobile / Tablet Orbit
  canvas.addEventListener('touchstart', (e) => {
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
    camPitch = Math.max(-1.2, Math.min(1.2, camPitch + dy * 0.008));
    lastMouseX = e.touches[0].clientX;
    lastMouseY = e.touches[0].clientY;
  });

  canvas.addEventListener('touchend', () => { isDragging = false; });

  window.addEventListener('keydown', (e) => {
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
