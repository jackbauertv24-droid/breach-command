import * as THREE from "three";
const noise = new Uint8Array(128 * 128 * 4);
let seed = 731;
for (let i = 0; i < 128 * 128; i++) {
  seed = (Math.imul(seed, 1664525) + 1013904223) | 0;
  const v = 150 + ((seed >>> 24) % 65);
  noise[i * 4] =
    noise[i * 4 + 1] =
    noise[i * 4 + 2] =
      (i % 128) % 31 === 0 ? v * 0.65 : v;
  noise[i * 4 + 3] = 255;
}
const surface = new THREE.DataTexture(noise, 128, 128);
surface.wrapS = surface.wrapT = THREE.RepeatWrapping;
surface.needsUpdate = true;
const mat = (color, metalness = 0.65, roughness = 0.5) =>
  new THREE.MeshStandardMaterial({
    color,
    metalness,
    roughness,
    map: surface,
    bumpMap: surface,
    bumpScale: 0.035,
  });
const steel = mat(0x546168),
  dark = mat(0x252d31),
  trim = mat(0x929c9e),
  olive = mat(0x747569),
  rubber = mat(0x161c20, 0.1, 0.9),
  bone = mat(0x796c5b, 0.1, 0.68),
  flesh = mat(0x433c3c, 0.05, 0.78),
  shell = mat(0x646356, 0.15, 0.5);
const glow = new THREE.MeshStandardMaterial({
  color: 0x8abcc1,
  emissive: 0x4d9da7,
  emissiveIntensity: 1.8,
  metalness: 0.4,
  roughness: 0.3,
});
export function part(
  group,
  geo,
  material,
  x = 0,
  y = 0,
  z = 0,
  sx = 1,
  sy = 1,
  sz = 1,
) {
  const m = new THREE.Mesh(geo, material);
  m.position.set(x, y, z);
  m.scale.set(sx, sy, sz);
  m.castShadow = true;
  m.receiveShadow = true;
  group.add(m);
  return m;
}
const box = new THREE.BoxGeometry(1, 1, 1),
  sphere = new THREE.SphereGeometry(1, 20, 12),
  cyl = new THREE.CylinderGeometry(1, 1, 1, 20),
  cone = new THREE.ConeGeometry(1, 1, 12);
function beam(g, a, b, r, m) {
  const v = new THREE.Vector3(...b).sub(new THREE.Vector3(...a));
  const mesh = part(
    g,
    cyl,
    m,
    ...new THREE.Vector3(...a).addScaledVector(v, 0.5).toArray(),
    r,
    v.length(),
    r,
  );
  mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), v.normalize());
  return mesh;
}
function bolts(g, y, r) {
  for (let i = 0; i < 8; i++) {
    const a = (i * Math.PI) / 4;
    part(g, cyl, trim, Math.cos(a) * r, y, Math.sin(a) * r, 0.06, 0.05, 0.06);
  }
}
export function towerModel(type, tier = 0, branch = null) {
  const g = new THREE.Group();
  g.name = type;
  const turret = new THREE.Group();
  turret.name = "turret";
  g.add(turret);
  g.userData.turret = turret;
  if (type === "reactor") {
    part(g, cyl, dark, 0, 0.2, 0, 3, 0.4, 3);
    part(g, cyl, steel, 0, 1.5, 0, 1.8, 2.6, 1.8);
    part(g, cyl, glow, 0, 2.95, 0, 1.15, 0.25, 1.15);
    part(g, cyl, dark, 0, 3.25, 0, 1.5, 0.35, 1.5);
    for (let i = 0; i < 6; i++) {
      const a = (i * Math.PI) / 3;
      const p = part(
        g,
        box,
        olive,
        Math.cos(a) * 2,
        1.5,
        Math.sin(a) * 2,
        0.65,
        2.7,
        0.9,
      );
      p.rotation.y = -a;
      beam(
        g,
        [Math.cos(a) * 2, 0.3, Math.sin(a) * 2],
        [Math.cos(a) * 1.3, 3.3, Math.sin(a) * 1.3],
        0.12,
        trim,
      );
    }
    part(g, cyl, trim, 0, 4, 0, 0.12, 1.3, 0.12);
    return g;
  }
  part(g, cyl, dark, 0, 0.15, 0, 1.25, 0.3, 1.25);
  part(g, cyl, steel, 0, 0.4, 0, 0.95, 0.3, 0.95);
  bolts(g, 0.57, 0.76);
  for (let i = 0; i < 4; i++) {
    const a = Math.PI / 4 + (i * Math.PI) / 2;
    const foot = part(
      g,
      box,
      olive,
      Math.cos(a) * 0.85,
      0.3,
      Math.sin(a) * 0.85,
      0.7,
      0.4,
      0.42,
    );
    foot.rotation.y = -a;
  }
  if (["mine", "generator", "heat", "vibration"].includes(type)) {
    part(g, box, steel, 0, 0.95, 0, 1.5, 1.1, 1.5);
    for (let i = 0; i < 5; i++)
      part(g, box, dark, 0.77, 0.65 + i * 0.13, 0, 0.06, 0.05, 1);
    if (type === "mine") {
      beam(g, [-0.6, 1, 0], [0.5, 3.1, 0], 0.14, trim);
      beam(g, [0.6, 1, 0], [0.5, 3.1, 0], 0.14, trim);
      part(turret, cone, trim, 0.5, 1.8, 0, 0.4, 2, 0.4);
      part(g, box, olive, -0.5, 1.4, 0.3, 0.5, 0.6, 0.8);
    } else if (type === "generator") {
      for (const x of [-0.42, 0.42]) {
        part(g, cyl, dark, x, 1.4, 0, 0.3, 1.3, 0.3);
        part(g, cyl, glow, x, 2.1, 0, 0.26, 0.15, 0.26);
      }
      for (let i = 0; i < 6; i++)
        part(g, box, trim, 0, 0.9 + i * 0.1, 0.82, 1.3, 0.04, 0.05);
    } else {
      part(g, cyl, trim, 0, 1.6, 0, 0.16, 1.2, 0.16);
      for (let i = 0; i < 3; i++) {
        const ring = part(
          g,
          new THREE.TorusGeometry(0.5 - i * 0.1, 0.06, 8, 24),
          type === "heat" ? mat(0xb58657) : glow,
          0,
          1.5 + i * 0.3,
          0,
        );
        ring.rotation.x = Math.PI / 2;
      }
    }
    return g;
  }
  part(g, cyl, trim, 0, 0.8, 0, 0.52, 0.5, 0.52);
  turret.position.y = 1.05;
  part(turret, box, olive, 0, 0.2, 0, 1.25, 0.6, 1.1);
  part(turret, box, steel, 0, 0.58, 0, 1.05, 0.18, 0.95);
  for (const x of [-0.66, 0.66]) {
    part(turret, box, dark, x, 0.3, 0.05, 0.1, 0.5, 0.7);
    for (let i = 0; i < 4; i++)
      part(turret, box, trim, x, 0.3, -0.2 + i * 0.13, 0.13, 0.3, 0.035);
  }
  const barrel = (x, y, z, len, r = 0.12) => {
    const b = part(turret, cyl, dark, x, y, z, r, len, r);
    b.rotation.x = Math.PI / 2;
    const muzzle = part(
      turret,
      cyl,
      trim,
      x,
      y,
      z + len / 2,
      r * 1.4,
      0.18,
      r * 1.4,
    );
    muzzle.rotation.x = Math.PI / 2;
  };
  if (type === "autocannon" || type === "flak") {
    for (const x of [-0.3, 0.3]) barrel(x, 0.3, 1.1, 1.8, 0.1);
    if (type === "flak")
      for (const x of [-0.3, 0.3]) barrel(x, 0.62, 1, 1.6, 0.1);
  }
  if (type === "railgun") {
    part(turret, box, dark, 0, 0.35, 1.1, 0.4, 0.35, 2.9);
    for (const x of [-0.25, 0.25])
      part(turret, box, trim, x, 0.4, 1.2, 0.09, 0.3, 2.8);
    for (let i = 0; i < 5; i++)
      part(turret, box, glow, 0, 0.55, 0.3 + i * 0.42, 0.25, 0.04, 0.12);
  }
  if (type === "missile") {
    for (const x of [-0.7, 0.7]) {
      part(turret, box, steel, x, 0.5, 0.2, 0.55, 0.85, 1.4);
      for (let i = 0; i < 3; i++)
        for (let j = 0; j < 2; j++) {
          const m = part(
            turret,
            cyl,
            rubber,
            x - 0.13 + j * 0.26,
            0.25 + i * 0.25,
            0.94,
            0.095,
            0.08,
            0.095,
          );
          m.rotation.x = Math.PI / 2;
        }
    }
  }
  if (type === "incinerator" || type === "cryo") {
    barrel(0, 0.4, 1, 1.6, 0.24);
    for (const x of [-0.65, 0.65]) {
      part(
        turret,
        cyl,
        type === "cryo" ? trim : olive,
        x,
        0.4,
        -0.2,
        0.23,
        0.9,
        0.23,
      );
      beam(turret, [x, 0.8, -0.2], [0, 0.4, 0.9], 0.06, rubber);
    }
  }
  if (type === "arc") {
    for (const x of [-0.4, 0.4]) {
      part(turret, cyl, trim, x, 0.8, 0, 0.11, 1.2, 0.11);
      for (let i = 0; i < 4; i++)
        part(turret, cyl, glow, x, 0.55 + i * 0.22, 0, 0.22, 0.09, 0.22);
    }
    beam(turret, [-0.4, 1.3, 0], [0.4, 1.3, 0], 0.05, trim);
  }
  if (type === "mortar") {
    const b = part(turret, cyl, dark, 0, 0.8, 0.5, 0.35, 1.7, 0.35);
    b.rotation.x = 0.6;
    const rim = part(
      turret,
      new THREE.TorusGeometry(0.35, 0.07, 8, 24),
      trim,
      0,
      1.48,
      0.98,
    );
    rim.rotation.x = 0.6;
  }
  if (type === "drone") {
    part(turret, box, steel, 0, 0.4, 0, 2, 0.55, 1.8);
    for (const x of [-0.7, 0.7]) {
      part(turret, box, glow, x, 0.7, 0, 0.04, 0.03, 1.3);
      const d = new THREE.Group();
      d.name = "drone";
      turret.add(d);
      d.position.set(x, 1, 0.3);
      part(d, box, olive, 0, 0, 0, 0.35, 0.15, 0.55);
      for (const a of [-0.23, 0.23])
        part(d, cyl, dark, a, 0, 0, 0.15, 0.06, 0.15);
    }
  }
  if (type === "seismic") {
    part(turret, cyl, dark, 0, 0.7, 0, 0.65, 1.2, 0.65);
    for (let i = 0; i < 4; i++)
      part(turret, cyl, trim, 0, 0.4 + i * 0.25, 0, 0.72, 0.07, 0.72);
    part(turret, cyl, olive, 0, 1.5, 0, 0.42, 0.5, 0.42);
  }
  for (let i = 0; i < tier; i++) {
    part(g, box, steel, -1.1, 0.65 + i * 0.3, 0, 0.25, 0.25, 1.2);
    part(g, box, olive, 1.1, 0.65 + i * 0.3, 0, 0.25, 0.25, 1.2);
    part(g, box, glow, 0, 0.6 + i * 0.18, -1, 0.5, 0.06, 0.06);
  }
  if (branch != null)
    part(
      turret,
      sphere,
      branch === 0 ? trim : glow,
      0,
      0.8,
      -0.5,
      0.23,
      0.23,
      0.23,
    );
  return g;
}
export function enemyModel(kind, boss = null) {
  const g = new THREE.Group();
  g.name = boss != null ? "boss-" + boss : "enemy-" + kind;
  const legs = [];
  g.userData.legs = legs;
  const heavy = [1, 9].includes(kind) || boss != null;
  const body = part(
    g,
    sphere,
    flesh,
    0,
    0.65,
    0,
    heavy ? 0.8 : 0.45,
    0.45,
    heavy ? 1.1 : 0.7,
  );
  body.name = "abdomen";
  part(
    g,
    sphere,
    shell,
    0,
    0.9,
    -0.15,
    heavy ? 0.85 : 0.5,
    0.3,
    heavy ? 0.9 : 0.6,
  );
  part(g, sphere, bone, 0, 0.6, 0.7, 0.35, 0.3, 0.35);
  for (const x of [-0.22, 0.22]) {
    part(g, sphere, glow, x, 0.72, 0.9, 0.07, 0.06, 0.05);
    beam(g, [x, 0.5, 0.9], [x * 1.8, 0.35, 1.35], 0.055, bone);
  }
  for (let i = 0; i < 3; i++) {
    for (const side of [-1, 1]) {
      const leg = new THREE.Group();
      leg.position.set(side * 0.35, 0.55, -0.55 + i * 0.5);
      g.add(leg);
      beam(leg, [0, 0, 0], [side * 0.55, 0.05, 0.15], 0.065, bone);
      beam(
        leg,
        [side * 0.55, 0.05, 0.15],
        [side * 0.75, -0.5, 0.4],
        0.05,
        shell,
      );
      legs.push(leg);
    }
  }
  for (let i = 0; i < (heavy ? 7 : 3); i++) {
    const spike = part(g, cone, bone, 0, 1, -0.7 + i * 0.22, 0.12, 0.45, 0.12);
    spike.rotation.x = -0.4;
  }
  if (kind === 5) {
    for (const side of [-1, 1]) {
      const wing = part(
        g,
        sphere,
        new THREE.MeshStandardMaterial({
          color: 0x8a8e84,
          transparent: true,
          opacity: 0.55,
          metalness: 0.2,
          roughness: 0.4,
        }),
        side * 0.9,
        0.9,
        -0.15,
        0.85,
        0.025,
        0.5,
      );
      wing.name = "wing";
    }
    g.position.y = 2;
  }
  if (kind === 6 || boss === 1) {
    for (const side of [-1, 1])
      beam(g, [side * 0.3, 1, 0], [side * 0.5, 1.5, 0.9], 0.18, shell);
  }
  if (kind === 7) part(g, sphere, glow, 0, 0.8, -0.6, 0.28, 0.22, 0.3);
  if (kind === 3) {
    for (let i = 0; i < 4; i++)
      part(
        g,
        new THREE.TorusGeometry(0.4, 0.07, 6, 16),
        bone,
        0,
        0.55,
        -0.7 + i * 0.25,
      ).rotation.x = Math.PI / 2;
  }
  if (kind === 8) part(g, cone, bone, 0, 1, 0.5, 0.2, 0.9, 0.2);
  if (kind === 9 || boss === 2)
    for (const side of [-1, 1])
      for (let i = 0; i < 3; i++)
        part(
          g,
          sphere,
          flesh,
          side * 0.6,
          0.8,
          -0.65 + i * 0.4,
          0.25,
          0.25,
          0.25,
        );
  if (boss != null) {
    g.scale.setScalar(3.3);
    for (const side of [-1, 1])
      beam(g, [side * 0.5, 0.8, 0.2], [side * 1.5, 1.6, 1.4], 0.16, bone);
    if (boss === 0) {
      part(g, cone, shell, 0, 1.3, -0.5, 0.7, 1.2, 0.7);
    }
    if (boss === 2)
      for (let i = 0; i < 5; i++)
        beam(
          g,
          [0, 1, -0.5],
          [Math.sin(i) * 1.1, 1.9, Math.cos(i) * 0.7],
          0.1,
          bone,
        );
  }
  return g;
}
export function featureModel(type) {
  if (type === 0) return towerModel("vibration");
  if (type === 3) return towerModel("generator");
  if (type === 5) {
    const g = towerModel("mine");
    g.scale.setScalar(0.8);
    return g;
  }
  const g = new THREE.Group();
  if (type === 1) {
    part(g, cyl, dark, 0, 0.1, 0, 1.4, 0.2, 1.4);
    part(g, cyl, trim, 0, 0.3, 0, 0.7, 0.3, 0.7);
    for (let i = 0; i < 6; i++) {
      const a = (i * Math.PI) / 3;
      part(
        g,
        cyl,
        glow,
        Math.cos(a) * 0.9,
        0.4,
        Math.sin(a) * 0.9,
        0.14,
        0.25,
        0.14,
      );
    }
  } else {
    for (let i = 0; i < 5; i++) {
      const m = part(
        g,
        new THREE.DodecahedronGeometry(1, 1),
        type === 2 ? mat(0x8a6b49, 0.2, 0.75) : shell,
        Math.sin(i * 2) * 1,
        0.5,
        Math.cos(i * 2),
        0.7,
        0.7 + i * 0.3,
        0.7,
      );
      m.rotation.set(i, 0.7 * i, 0.2);
    }
  }
  return g;
}
