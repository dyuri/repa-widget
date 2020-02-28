(function() {
  const isdev = () => {
    // return the content of the "developer" cookie
    const cks = document.cookie.split(";").map(str => str.replace(/\s*/g, ""));
    const ckvs = cks.map(ck => {
      const kv = ck.split("=");
      if (kv[0] === "developer") {
        return kv[1];
      }
      return false;
    }).filter(ckv => ckv);

    return ckvs[0] || false;
  };

  const bundlename = () => {
    // return bundle name if explicitly defined
    if (window.REPABUNDLE) {
      return window.REPABUNDLE;
    }

    // return path name w/o extension
    const pathparts = window.location.pathname.split("/");
    const pp = pathparts[pathparts.length - 1];
    if (pp) {
      return pp.split(".")[0];
    }

    // fallback to "all"
    return "all";
  };

  const ismodern = () => {
    // TODO verify
    const script = document.createElement('script');
    return "noModule" in script;
  };

  const loadCSS = (bundle, root, dev) => {
    let bundlepath = "";
    if (!dev) {
      bundlepath = root + "/bundle/" + bundle + ".css";
    } else if (dev.indexOf("css") > -1) {
      bundlepath = root + "/css/" + bundle + ".css";
    } else {
      bundlepath = root + "/bundle/" + bundle + ".sm.css";
    }
    bundlepath = bundlepath.replace(/\/+/g, "/");

    const link = document.createElement("link");
    link.href = bundlepath;
    link.type = "text/css";
    link.rel = "stylesheet";

    document.querySelector("head").appendChild(link);
  };
  const loadJS = (bundle, root, dev, modern) => {
    let bundlepath = "";
    const asmodule = dev.indexOf("js") > -1;
    // TODO load polyfills for old browsers
    if (!dev) {
      if (modern) {
        bundlepath = root + "/bundle/" + bundle + ".js";
      } else {
        bundlepath = root + "/bundle/" + bundle + ".ie.js";
      }
    } else if (asmodule) {
      bundlepath = root + "/js/" + bundle + ".js";
    } else if (modern) {
      bundlepath = root + "/bundle/" + bundle + ".sm.js";
    } else {
      bundlepath = root + "/bundle/" + bundle + ".ie.sm.js";
    }
    bundlepath = bundlepath.replace(/\/+/g, "/");

    const script = document.createElement("script");
    if (asmodule) {
      script.async = true;
      script.type = "module";
    }
    script.src = bundlepath;

    document.querySelector("head").appendChild(script);
  };

  const root = window.REPAROOT || "";
  const bundle = bundlename();
  const modern = ismodern();
  const dev = isdev() || "";

  loadCSS(bundle, root, dev);
  loadJS(bundle, root, dev, modern);
}());
