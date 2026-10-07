# Command reactor

Asset ID: `reactor`

Current export: `public/assets/models/reactor.json`. This export is a placeholder; do not copy its shape as the art target.

Read [art direction](../ART_DIRECTION.md), [technical contract](../TECHNICAL_CONTRACT.md), [quality gate](../QUALITY_GATE.md), and [integration guide](../INTEGRATION.md) with this brief.

## Concept, role and vibe

The colony anchor and run-ending objective: a protected compact fusion/industrial command core, heavy enough to establish the scene hierarchy. Original military-industrial design; understated, detailed and physically convincing.

## Required silhouette

A broad circular reinforced foundation, shielded reactor body, segmented external armor and a protected command/service crown. It must remain recognizable among ten tower families and enemy swarms. Apply consistent colony construction standards, bearing/fastener language and grounded proportions. This structure must be recognizable without a UI label.

## Material and detail specification

Reactor confinement rings, removable armor panels, access ladder/maintenance hatch, protected power trunks, credible cooling outlets and modest status lighting. Avoid a plain cylinder with glowing rings. Use differentiated painted metal, rubber/insulation, bare moving surfaces and appropriate thermal materials. Wear follows work, handling and ground exposure; do not distribute random rust or noise uniformly. All sides need completed surfaces and join logic.

## Animation and state requirements

Steady low mechanical activity and subtle operating light; damage creates localized sparking and cooling trouble. Destruction is a readable core failure with a brief protected flash, debris and a lasting ruined shell. No endless blinding explosion. Named clips: `idle`, `construct`, `damaged_idle`, `destroy`. Socket inventory: `fx_core`, `fx_heat`, `fx_damage`, `audio_origin`, `selection_anchor`. Support structures have no tower upgrade variants in the current game; do not invent upgrade assets or attack mechanics for them.

## Scale, packaging and integration

Proposed envelope: 6 m base diameter, roughly 4.6 m height. Keep `root` at ground-contact center; +Y up, +Z forward. Produce opaque PBR materials and an economical LOD chain. Deliver GLB, editable source, textures, animated previews and `delivery.json` under `public/assets/replacements/reactor/`. Current factory key is `reactor`; imported operation clips need an adapter, not the current generic turret animation.

## Agent instruction and acceptance

Create the final 3D production candidate, not just a concept image. Review its industrial function from normal camera distance and its seams/materials at near zoom. Provide a damaged and destroyed presentation that preserves gameplay readability. Reject smooth geometric stand-ins, plastic finishes, cartoon proportions and unmotivated flashing lights.
