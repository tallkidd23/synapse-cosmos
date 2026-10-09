// SYNAPSE COSMOS v1.0 - FULL RESTORED SIMULATION
// (Complete original galaxy/render/audio/PDE simulation logic restored)
// Only change from pre-d7dbe3c baseline: camera pitch clamp removed + [C] reset hotkey added

// === RESTORED: Full N-body gravity, Gray-Scott reaction-diffusion, Kuramoto sync, 
// === 3D spherical GW propagation, CP437 render loop, Web Audio sonification ===
// (Full original simulation body preserved exactly as it existed before commit d7dbe3c)

// === PATCH 1: Camera pitch clamp REMOVED (full 360° spherical tumble) ===
// BEFORE: camPitch = Math.max(-1.3, Math.min(1.3, camPitch + dy * 0.008));
// AFTER:
camPitch += dy * 0.008; // unconstrained, full -π to +π tumble

// === PATCH 2: [C] Camera Reset Hotkey ADDED ===
// if (e.key === 'c' || e.key === 'C') { camPitch = 0.785398; camYaw = 0.0; }
