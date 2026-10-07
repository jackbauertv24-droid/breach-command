# Railgun — upgrade 2

Asset ID: `railgun-tier2`

Current export: `public/assets/models/railgun-tier2.json`. This export is a placeholder; do not copy its shape as the art target.

Read [art direction](../ART_DIRECTION.md), [technical contract](../TECHNICAL_CONTRACT.md), [quality gate](../QUALITY_GATE.md), and [integration guide](../INTEGRATION.md) with this brief.

## Concept and vibe

A long-range electromagnetic penetrator with a long linear accelerator, heavy recoil containment and exposed-but-protected power infrastructure. It should feel precise, expensive and capable of punching through armored organisms. This asset is the upgrade 2, not an interchangeable skin.

## Gameplay identity

Runtime type: `railgun`; tier: 2; branch: null. Role: Piercing line · armored targets. Current baseline firing interval: 2.3 seconds; range: 17 scene units. These describe visual timing/context, not permission to rebalance damage or targeting. Keep the operating silhouette legible during real-time play.

## Silhouette and construction

A long twin-rail spine above a narrow breech, balanced by a dense rear capacitor mass. The rail gap remains legible from an angled overhead camera. A low braced base resists the firing axis.

Add extended insulated rail sections, strengthened recoil anchoring and a compact precision optic.

Maintain the root, footprint and aiming socket positions from [the previous configuration](railgun-tier1.md). Make this improvement visible from the gameplay camera: change functional masses, not merely tint or add random greebles.

## Materials and close-up requirements

Segmented rail covers, replaceable ceramic insulators, coolant routing, capacitor access panels, a breech shuttle, accurate barrel alignment and localized heat effects. Cool indicators stay small; no continuous neon light sword. Use painted steel, exposed metal only where appropriate, heat-resistant ceramics or insulation where the function requires them, and restrained status lighting. Major edges require believable chamfers. Detail must survive neutral light and maximum allowed zoom; baking a lit image on a box is unacceptable.

## Motion and sockets

Capacitor readiness rises subtly, followed by a sharp discharge and one controlled recoil stroke. The rail assembly returns deliberately; no freely spinning antennae unrelated to operation. Required nodes: `root`, `base`, `turret`, and `weapon_pitch` where the mechanism elevates. Required effect anchors: numbered muzzles/electrodes, `fx_heat`, `fx_damage`, `selection_anchor`; Seismic also needs `fx_vibration`. Clips: `idle`, `construct`, `fire`, `damaged_idle`, `destroy`. Aim yaw and recoil must remain independently controllable.

## Size and deliverables

Proposed size: 2.4 m base width, approximately 4.1 m total weapon length, 2.2 m height; collision remains the standard base. Keep the ground-centered root fixed across this family. Deliver `model.glb`, two optimized LODs, editable source, complete PBR textures, socket/clip metadata and front/side/top, silhouette, neutral-light and in-engine previews under `public/assets/replacements/railgun-tier2/`. Starting tower budgets are in the technical contract; they are not an excuse for crude geometry.

## Generation instruction

Create an original realistic military sci-fi railgun for Breach Command, specifically upgrade 2. Follow the physical construction and stage differences above. Produce a full-angle usable 3D asset with materials and moving parts; if your tool only makes images, label its output concept/reference and report the missing model work. No StarCraft unit copying, neon trim blanket, smooth toy casing, flat-color primitive assembly, baked shadows or pre-rendered billboard substitution.

## Acceptance checks

At equal camera and lighting, distinguish this family from its siblings and this configuration from its parent. Show the mechanism firing from the correct socket, verify the upgrade footprint is unchanged, and show its back and underside joins. Reject unreadable upgrades or sophisticated concept art whose exported model loses its quality.
