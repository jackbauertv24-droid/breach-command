# Fractured basalt outcrop kit

Asset ID: `basalt-outcrop`

Additional production asset; requires the integration described in the shared guide.

Read [art direction](../ART_DIRECTION.md), [technical contract](../TECHNICAL_CONTRACT.md), [quality gate](../QUALITY_GATE.md), and [integration guide](../INTEGRATION.md) with this brief.

## Concept and atmosphere

A family of coherent fractured stone formations, with layered break planes and erosion that implies physical geology. The environment must support the detailed military/biological art direction and the free camera.

## Production specification

At least six distinguishable modules: low shelf, split pillar, fractured ridge, broad boulder, broken cluster and embedded fragment. Avoid smooth potatoes, random spike fields or uniformly triangulated crystals. Detail all sides; match ground mineral composition. Show representative close detail and a normal battlefield view. Detail hierarchy must stay coherent with the reactor and towers; terrain should not compete with selectable units.

## Scale and delivery

1–6 m modules; exact bounds and simple blocker proxies per variant. Deliver editable source, required runtime files, channel/packing notes, bounds or tile scale, provenance and preview evidence under `public/assets/replacements/basalt-outcrop/`. Use the shared contract for file types, color spaces and metadata. If multiple modules belong to this kit, enumerate each module and its filename in the delivery report rather than presenting a single beauty image as the whole kit.

## Integration requirement

Current rocks are procedurally placed instanced geometry. Replacement modules need a mapping from blocker radius/height to the chosen model and navigation-safe bounds. Current simulation rules remain authoritative. New decorative surface features cannot imply or secretly create fixed paths, build restrictions or resource mechanics.

## Generation instruction

Create a production-ready original realistic sci-fi mining-colony fractured basalt outcrop kit using the physical forms and surface requirements above. Use restrained color and readable macrostructure. Deliver a usable asset package, not only a concept painting or a texture with baked lighting.

## Acceptance

Test continuity with neighboring surfaces, all-angle readability, visible tiling/repetition, alpha seams and texture density. Supply neutral-light and game-light previews. Reject generic primitive stand-ins, flat color, toy-like geology or effects that hide the battlefield.
