# SYNAPSE COSMOS (v1.0)
### Museum-Grade Hyper-Dimensional Astrophysical Origin & Galaxy Formation Engine
*Pure IBM-PC CP437 ASCII / 16-Color CGA Retrotech Spacetime Architecture*

---

## 1. Executive Summary & Vision

**Synapse Cosmos** is an interactive, museum-grade astrophysical origin simulator running entirely inside standard web browsers in retro IBM-PC CP437 character rendering. 

Rather than relying on pre-rendered visual assets or static sprite animations, every particle, gas cloud, relativistic jet, and gravitational wave ripple emerges from **deterministic, coupled partial differential equations (PDEs)** executing at 60 FPS across parallel, wormhole-linked universe sectors.

---

## 2. Core Mathematical Physics & PDE Formulation

### A. 3D Keplerian Gravity & Softened Plummer Potential
The orbital trajectories of stellar cores, protoplanetary bodies, and accretion disks around the central Supermassive Black Hole (SMBH) are governed by Newtonian gravitational acceleration with a Plummer softening core radius:

$$\mathbf{a} = -\frac{G \cdot M_{\text{SMBH}}}{\left(r^2 + \epsilon^2\right)^{3/2}} \mathbf{r}$$

* **$G = 0.035$**: Universal gravitational constant scaled for terminal dimension space.
* **$\epsilon = 1.2$**: Plummer softening length to prevent divergent velocity singularities at the origin.
* **$v_{\text{tangent}} = \sqrt{\frac{G \cdot M_{\text{SMBH}}}{r}}$**: Circular Keplerian velocity ensuring stable logarithmic spiral arms ($m=2$).

---

### B. 3D Volumetric Spherical Gravitational Waves ($h_{\mu\nu}$)
Gravitational radiation emitted during core-collapse supernovae and relativistic tidal disruption events expands outward as true 3D spherical wavefronts:

$$\Box \bar{h}_{\mu\nu} = \left(-\frac{1}{c^2}\frac{\partial^2}{\partial t^2} + \nabla^2\right) \bar{h}_{\mu\nu} = -16\pi G T_{\mu\nu}$$

* **Propagation:** Spherical shells expand at relativistic velocity $c$, visualized through 3D perspective depth-shading.
* **Quadrupole Spacetime Strain ($h_+$ mode):** Passing metric wavefronts exert a transverse quadrupolar squeeze on surrounding matter, compressing the $X$-axis while stretching the $Y$-axis.

---

### C. Gray-Scott Stellar Nucleogenesis & Gas Ionization
The diffuse interstellar medium transitions from cold molecular hydrogen ($U$) into luminous, ionized starburst nebulae ($V$) via non-linear reaction-diffusion:

$$\frac{\partial U}{\partial t} = D_u \nabla^2 U - U V^2 + F(1 - U)$$
$$\frac{\partial V}{\partial t} = D_v \nabla^2 V + U V^2 - (F + k)V$$

* **$D_u = 0.16, D_v = 0.08$**: Molecular gas diffusion coefficients.
* **$F, k$**: Epoch-dependent feeding and decay parameters that dictate cosmic star formation rates.

---

### D. Kuramoto Non-Local Quantum Phase Synchronization
Entangled binary pulsars linked across Einstein-Rosen wormholes synchronize their high-frequency pulsation angles ($\theta$) across multiverse boundaries:

$$\frac{d\theta_i}{dt} = \omega_i + \frac{K}{N} \sum_{j=1}^N \sin(\theta_j - \theta_i) + K_{\text{ER}} \sin(\theta_{\text{entangled}} - \theta_i)$$

* **$\omega_i$**: Natural intrinsic pulsar rotation frequency.
* **$K_{\text{ER}}$**: Cross-dimensional wormhole coupling constant that drives simultaneous visual flashing and Web Audio FM synthesis.

---

### E. 3D Perspective Ray-Projection (Dimension-X)
Spatial coordinates $\mathbf{X} = (X, Y, Z)$ are transformed via a dual-axis rotation matrix (Yaw $\psi$, Pitch $\phi$) and projected onto the 2D terminal canvas:

$$\begin{bmatrix} X' \\ Y' \\ Z' \end{bmatrix} = \begin{bmatrix} 1 & 0 & 0 \\ 0 & \cos\phi & -\sin\phi \\ 0 & \sin\phi & \cos\phi \end{bmatrix} \begin{bmatrix} \cos\psi & -\sin\psi & 0 \\ \sin\psi & \cos\psi & 0 \\ 0 & 0 & 1 \end{bmatrix} \begin{bmatrix} X \\ Y \\ Z \end{bmatrix}$$

$$X_{\text{screen}} = X_{\text{mid}} + \frac{X' \cdot f_{\text{fov}}}{Z' + d_{\text{cam}}}, \quad Y_{\text{screen}} = Y_{\text{mid}} + \frac{Y' \cdot f_{\text{fov}}}{Z' + d_{\text{cam}}}$$

---

## 3. Stellar Evolutionary Classes & Metallicity ($Z$)

| Class | Symbol | CGA Color | Mass ($M_\odot$) | Nucleosynthetic Stage |
| :--- | :---: | :--- | :---: | :--- |
| **Pop-III Blue Hypergiant** | `☼` | Light Blue (`#5555FF`) | $60.0$ | Primordial Zero Metallicity ($H / He$) |
| **Pop-II H-II Starburst Hub** | `ж` | Light Magenta (`#FF55FF`) | $35.0$ | Intermediate CNO Carbon-Oxygen Fusion |
| **Pop-I Protostellar Core** | `▲` | Yellow (`#FFFF55`) | $12.0$ | Solar Metallicity (Iron-Rich Rocky Dust) |
| **Relativistic Magnetar** | `♦` | Light Green (`#55FF55`) | $2.4$ | Degenerate Compact Pulsar Remnant |
| **Supermassive Black Hole** | `◄►` | Red (`#AA0000`) | $95.0+$ | Relativistic Tidal Disruption Singularity |
| **Einstein Lensing Ring** | `◎` | Light Cyan (`#55FFFF`) | -- | Optical Gravitational Deflection Ring |

---

## 4. Live Chemical Emission Spectroscopy HUD (Key `[S]`)

Real-time absorption and emission spectroscopy dynamically scans the active stellar populations and supernova counts within the focused universe quadrant:

* **[H-ALPHA 740nm]**: Primordial Neutral Hydrogen fraction ($X$).
* **[O-III 500nm]**: Doubly Ionized Oxygen starburst gas ($Y$).
* **[FE-II 440nm]**: Heavy element supernova enrichment & rocky planetesimals ($Z$).

---

## 5. Web Audio 8-Bit Astrophysical Sonification

Built on the native browser **Web Audio API** with zero external dependencies:
1. **Pulsar FM Chirps:** Triangle-wave frequency-modulated audio clicks tuned to Kuramoto phase pulses.
2. **Gravitational Wave Rumbles:** Sub-bass sawtooth chirps (55 Hz $\rightarrow$ 150 Hz) emitted during black hole mergers.
3. **Supernova Detonations:** Filtered exponential-decay white noise bursts.

---

## 6. Complete Command Deck & Interactive Controls

| Control | Action | Physical Effect |
| :--- | :--- | :--- |
| **`Shift + Left-Click Drag`** | **Drop Gravity Well (`☼✛☼`)** | Injects an active mass attractor, pulling stars & planetesimals into slingshots. |
| **`Right-Click`** | **Detonate Supernova** | Triggers an immediate core-collapse explosion, radiating a 3D spherical GW shell. |
| **`Left-Click Drag`** | **3D Camera Orbit** | Smoothly rotates Pitch & Yaw angles around the active galaxy in 3D. |
| **`Mouse Wheel` or `+ / -`** | **Deep-Space Zoom** | Adjusts camera distance from 18.0 to 85.0 parsecs. |
| **`[` / `<`** | **Time-Warp Decelerate** | Slows cosmic time down to **0.1x / 0.5x investigative slow-motion**. |
| **`]` / `>`** | **Time-Warp Accelerate** | Speeds up cosmic time up to **5.0x / 10.0x / 25.0x hyper-speed**. |
| **`[S]`** | **Toggle Spectroscopy HUD** | Opens live real-time chemical metallicity breakdown. |
| **`[M]`** | **Cycle Multiverse Layout** | Toggles between **2x2 Matrix**, **1x3 Column Stack**, and **1x1 Focused View**. |
| **`[1 - 4]`** | **Focus Sector** | Instantly maximizes any individual universe quadrant. |
| **`[P]`** | **Pause / Resume** | Freezes cosmic evolution in lockstep across all multiverse sectors. |
| **`[R]`** | **Big Bang Reset** | Re-seeds all universe sectors with fresh deterministic topologies. |
| **`[C]`** | **Camera Reset** | Snaps camera orientation back to standard 45° isometric vantage point. |

---

## 7. Full 360° × 360° Unconstrained 3D Orbital Camera

The camera pitch clamp has been removed, enabling full unconstrained spherical navigation:

* **Full Pitch Tumbling ($-\pi \rightarrow +\pi$):** Flip completely upside down, view galaxies from beneath their southern poles, and loop continuously over the top.
* **Full Yaw Continuous Rotation ($0 \rightarrow 2\pi$):** Infinite 360-degree azimuthal orbiting without reaching a barrier.
* **Dedicated Camera Reset Hotkey (`[C]`):** Snaps camera orientation back to the standard $45^\circ$ isometric vantage point.

---

## 8. Future Horizons: Hexagonal Bubbleverses & Spatial Art Displays

* **Hexagonal Bubbleverse Tessellation:** Expanding the rectangular matrix into a contiguous hexagonal honeycomb lattice where each cell is a self-contained dimensional universe sharing boundary flux.
* **Large-Scale Museum Spatial Exhibits:** Multi-monitor / wall-projection ultra-wide layout support designed for high-resolution gallery installations.

---

## 9. License
MIT Open Source. Designed for cosmological exploration and generative art.
