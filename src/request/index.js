const modulesFiles = import.meta.globEager('./modules/**.js');
let modules = {};
for (const path in modulesFiles) {
  let object = modulesFiles[path].default;
  for (const key in object) {
    if (Object.hasOwnProperty.call(object, key)) {
      const element = object[key];
      modules[key] = element
    }
  }
}

export default {
  ...modules
}