/* @ds-bundle: {"format":4,"namespace":"BeyondTenunDesignSystem_9d918e","components":[{"name":"Badge","sourcePath":"components/content/Badge.jsx"},{"name":"Card","sourcePath":"components/content/Card.jsx"},{"name":"Eyebrow","sourcePath":"components/content/Eyebrow.jsx"},{"name":"Quote","sourcePath":"components/content/Quote.jsx"},{"name":"Stat","sourcePath":"components/content/Stat.jsx"},{"name":"Step","sourcePath":"components/content/Step.jsx"},{"name":"Tag","sourcePath":"components/content/Tag.jsx"},{"name":"Button","sourcePath":"components/forms/Button.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Radio","sourcePath":"components/forms/Radio.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"Dialog","sourcePath":"components/overlay/Dialog.jsx"},{"name":"Tabs","sourcePath":"components/overlay/Tabs.jsx"},{"name":"Toast","sourcePath":"components/overlay/Toast.jsx"},{"name":"Tooltip","sourcePath":"components/overlay/Tooltip.jsx"}],"sourceHashes":{"components/content/Badge.jsx":"4f7f8f50e04b","components/content/Card.jsx":"0cf6d9915dc1","components/content/Eyebrow.jsx":"b71ac72382c1","components/content/Quote.jsx":"498ecbe6a341","components/content/Stat.jsx":"2915503b2903","components/content/Step.jsx":"a2007879ed8e","components/content/Tag.jsx":"e028e9f63f4f","components/forms/Button.jsx":"ccae9444d6da","components/forms/Checkbox.jsx":"934d5adabbe1","components/forms/Input.jsx":"1f746140c8de","components/forms/Radio.jsx":"581f4d0ec1d5","components/forms/Select.jsx":"11e89c812ef3","components/forms/Switch.jsx":"775974255fdd","components/overlay/Dialog.jsx":"81a37d7800fd","components/overlay/Tabs.jsx":"f0732336378a","components/overlay/Toast.jsx":"45f32e58cc05","components/overlay/Tooltip.jsx":"5ac6f66b26f3","ui_kits/deck/slides.jsx":"0cde5745f470","ui_kits/traceable-weaver/screens.jsx":"2c2b9322c6c8"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.BeyondTenunDesignSystem_9d918e = window.BeyondTenunDesignSystem_9d918e || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/content/Badge.jsx
try { (() => {
function Badge({
  children,
  tone = "ink",
  inverse = false
}) {
  const c = {
    ink: {
      bg: inverse ? "var(--bt-white)" : "var(--bt-ink)",
      fg: inverse ? "var(--bt-ink)" : "var(--bt-white)"
    },
    accent: {
      bg: inverse ? "var(--bt-salmon)" : "var(--bt-red)",
      fg: inverse ? "var(--bt-ink)" : "var(--bt-white)"
    },
    amber: {
      bg: "var(--bt-amber)",
      fg: "var(--bt-ink)"
    },
    outline: {
      bg: "transparent",
      fg: inverse ? "var(--bt-white)" : "var(--bt-ink)",
      bd: inverse ? "var(--bt-white)" : "var(--bt-ink)"
    }
  }[tone];
  return React.createElement("span", {
    style: {
      display: "inline-block",
      padding: "4px 8px",
      background: c.bg,
      color: c.fg,
      border: "1px solid " + (c.bd || "transparent"),
      font: "700 11px/1 var(--font-body)",
      letterSpacing: ".18em",
      textTransform: "uppercase",
      borderRadius: "var(--radius-none)"
    }
  }, children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/Badge.jsx", error: String((e && e.message) || e) }); }

// components/content/Card.jsx
try { (() => {
function Card({
  eyebrow,
  title,
  children,
  image,
  footer,
  tone = "default",
  inverse = false,
  padding = "24px",
  style
}) {
  const bg = {
    default: inverse ? "#2A2827" : "var(--bt-white)",
    tint: inverse ? "#332F2E" : "var(--bt-blush)",
    outline: "transparent"
  }[tone];
  const border = tone === "outline" ? "1px solid " + (inverse ? "rgba(255,255,255,.25)" : "var(--bt-ink)") : "1px solid " + (inverse ? "rgba(255,255,255,.12)" : "var(--bt-stone)");
  const ink = inverse ? "var(--bt-white)" : "var(--bt-ink)";
  return React.createElement("div", {
    style: {
      background: bg,
      border,
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
      ...style
    }
  }, image && React.createElement("div", {
    style: {
      aspectRatio: "16/9",
      background: "url(" + image + ") center/cover",
      filter: "var(--photo-filter)"
    }
  }), React.createElement("div", {
    style: {
      padding,
      flex: 1,
      display: "flex",
      flexDirection: "column",
      gap: "10px"
    }
  }, eyebrow && React.createElement("div", {
    style: {
      font: "400 12px/1 var(--font-body)",
      letterSpacing: ".32em",
      textTransform: "uppercase",
      color: inverse ? "var(--bt-salmon)" : "var(--bt-red)"
    }
  }, eyebrow), title && React.createElement("div", {
    style: {
      font: "900 22px/1.1 var(--font-display)",
      color: ink
    }
  }, title), children && React.createElement("div", {
    style: {
      font: "400 16px/1.4 var(--font-body)",
      color: inverse ? "rgba(255,255,255,.62)" : "var(--text-muted)"
    }
  }, children), footer && React.createElement("div", {
    style: {
      marginTop: "auto",
      paddingTop: "12px",
      borderTop: "1px solid " + (inverse ? "rgba(255,255,255,.12)" : "var(--bt-stone)"),
      font: "400 13px/1 var(--font-body)",
      letterSpacing: ".12em",
      textTransform: "uppercase",
      color: inverse ? "rgba(255,255,255,.62)" : "var(--text-muted)"
    }
  }, footer)));
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/Card.jsx", error: String((e && e.message) || e) }); }

// components/content/Eyebrow.jsx
try { (() => {
function Eyebrow({
  children,
  inverse = false,
  muted = false,
  as = "div",
  style
}) {
  return React.createElement(as, {
    style: {
      font: "400 13px/1 var(--font-body)",
      letterSpacing: "var(--tracking-eyebrow)",
      textTransform: "uppercase",
      color: muted ? inverse ? "rgba(255,255,255,.62)" : "var(--text-muted)" : inverse ? "var(--bt-salmon)" : "var(--bt-red)",
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { Eyebrow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/Eyebrow.jsx", error: String((e && e.message) || e) }); }

// components/content/Quote.jsx
try { (() => {
function Quote({
  children,
  source,
  inverse = false,
  size = "md"
}) {
  const fs = {
    md: "28px",
    lg: "40px"
  }[size];
  return React.createElement("figure", {
    style: {
      margin: 0,
      borderLeft: "2px solid " + (inverse ? "var(--bt-salmon)" : "var(--bt-red)"),
      paddingLeft: "24px"
    }
  }, React.createElement("blockquote", {
    style: {
      margin: 0,
      font: "400 " + fs + "/1.15 var(--font-display)",
      color: inverse ? "var(--bt-white)" : "var(--bt-ink)",
      letterSpacing: "-.01em"
    }
  }, children), source && React.createElement("figcaption", {
    style: {
      marginTop: "14px",
      font: "400 13px/1 var(--font-body)",
      letterSpacing: ".14em",
      textTransform: "uppercase",
      color: inverse ? "rgba(255,255,255,.62)" : "var(--text-muted)"
    }
  }, source));
}
Object.assign(__ds_scope, { Quote });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/Quote.jsx", error: String((e && e.message) || e) }); }

// components/content/Stat.jsx
try { (() => {
function Stat({
  value,
  label,
  accent = false,
  inverse = false,
  size = "lg",
  align = "left"
}) {
  const fs = {
    md: "64px",
    lg: "96px",
    xl: "120px"
  }[size];
  const color = accent ? inverse ? "var(--bt-salmon)" : "var(--bt-red)" : inverse ? "var(--bt-white)" : "var(--bt-ink)";
  return React.createElement("div", {
    style: {
      textAlign: align
    }
  }, React.createElement("div", {
    style: {
      font: "900 " + fs + "/1 var(--font-display)",
      letterSpacing: "-.03em",
      color
    }
  }, value), label && React.createElement("div", {
    style: {
      font: "400 17px/1.3 var(--font-body)",
      color: inverse ? "rgba(255,255,255,.62)" : "var(--text-muted)",
      marginTop: "8px",
      maxWidth: "28ch",
      marginLeft: align === "center" ? "auto" : 0,
      marginRight: align === "center" ? "auto" : 0
    }
  }, label));
}
Object.assign(__ds_scope, { Stat });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/Stat.jsx", error: String((e && e.message) || e) }); }

// components/content/Step.jsx
try { (() => {
function Step({
  number,
  title,
  children,
  inverse = false,
  rule = true,
  style
}) {
  const ink = inverse ? "var(--bt-white)" : "var(--bt-ink)";
  return React.createElement("div", {
    style: {
      borderTop: rule ? "2px solid " + (inverse ? "var(--bt-salmon)" : "var(--bt-red)") : "none",
      paddingTop: rule ? "14px" : 0,
      ...style
    }
  }, number !== undefined && React.createElement("div", {
    style: {
      font: "400 13px/1 var(--font-body)",
      letterSpacing: ".14em",
      color: inverse ? "var(--bt-salmon)" : "var(--bt-red)",
      marginBottom: "10px"
    }
  }, String(number).padStart(2, "0")), React.createElement("div", {
    style: {
      font: "900 20px/1.1 var(--font-display)",
      letterSpacing: ".06em",
      textTransform: "uppercase",
      color: ink
    }
  }, title), children && React.createElement("div", {
    style: {
      font: "400 16px/1.4 var(--font-body)",
      color: inverse ? "rgba(255,255,255,.62)" : "var(--text-muted)",
      marginTop: "8px"
    }
  }, children));
}
Object.assign(__ds_scope, { Step });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/Step.jsx", error: String((e && e.message) || e) }); }

// components/content/Tag.jsx
try { (() => {
function Tag({
  children,
  tone = "neutral",
  inverse = false,
  onRemove
}) {
  const c = {
    neutral: {
      bg: "transparent",
      fg: inverse ? "var(--bt-white)" : "var(--bt-ink)",
      bd: inverse ? "rgba(255,255,255,.35)" : "var(--bt-ink-3)"
    },
    accent: {
      bg: inverse ? "var(--bt-salmon)" : "var(--bt-red)",
      fg: inverse ? "var(--bt-ink)" : "var(--bt-white)",
      bd: "transparent"
    },
    soft: {
      bg: inverse ? "#332F2E" : "var(--bt-blush)",
      fg: inverse ? "var(--bt-salmon)" : "var(--bt-red)",
      bd: "transparent"
    }
  }[tone];
  return React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "8px",
      height: "26px",
      padding: "0 12px",
      border: "1px solid " + c.bd,
      background: c.bg,
      color: c.fg,
      borderRadius: "var(--radius-pill)",
      font: "400 13px/1 var(--font-body)",
      letterSpacing: ".1em",
      textTransform: "uppercase",
      whiteSpace: "nowrap"
    }
  }, children, onRemove && React.createElement("button", {
    type: "button",
    onClick: onRemove,
    "aria-label": "Remove",
    style: {
      all: "unset",
      cursor: "pointer",
      lineHeight: 1,
      fontSize: "14px"
    }
  }, "×"));
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/Tag.jsx", error: String((e && e.message) || e) }); }

// components/forms/Button.jsx
try { (() => {
function Button({
  variant = "primary",
  size = "md",
  inverse = false,
  disabled = false,
  fullWidth = false,
  children,
  onClick,
  type = "button",
  style
}) {
  const h = {
    sm: "var(--control-h-sm)",
    md: "var(--control-h-md)",
    lg: "var(--control-h-lg)"
  }[size];
  const px = {
    sm: "var(--control-px-sm)",
    md: "var(--control-px-md)",
    lg: "var(--control-px-lg)"
  }[size];
  const fs = {
    sm: "14px",
    md: "16px",
    lg: "18px"
  }[size];
  const ink = inverse ? "var(--bt-white)" : "var(--bt-ink)";
  const acc = inverse ? "var(--bt-salmon)" : "var(--bt-red)";
  const v = {
    primary: {
      background: acc,
      color: inverse ? "var(--bt-ink)" : "var(--bt-white)",
      border: "1px solid " + acc
    },
    secondary: {
      background: "transparent",
      color: ink,
      border: "1px solid " + ink
    },
    ghost: {
      background: "transparent",
      color: acc,
      border: "1px solid transparent"
    }
  }[variant];
  const [hover, setHover] = React.useState(false),
    [down, setDown] = React.useState(false);
  const hv = hover && !disabled ? variant === "primary" ? {
    background: inverse ? "#FFB3A4" : "var(--bt-red-bright)",
    borderColor: inverse ? "#FFB3A4" : "var(--bt-red-bright)"
  } : {
    background: inverse ? "rgba(255,255,255,.1)" : "rgba(32,30,29,.06)"
  } : {};
  return React.createElement("button", {
    type,
    disabled,
    onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setDown(false);
    },
    onMouseDown: () => setDown(true),
    onMouseUp: () => setDown(false),
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "10px",
      height: h,
      padding: "0 " + px,
      fontFamily: "var(--font-body)",
      fontSize: fs,
      fontWeight: 500,
      letterSpacing: ".12em",
      textTransform: "uppercase",
      borderRadius: "var(--radius-none)",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? .4 : 1,
      transform: down ? "translateY(1px)" : "none",
      transition: "background var(--duration-fast) var(--ease-out),border-color var(--duration-fast) var(--ease-out)",
      width: fullWidth ? "100%" : undefined,
      whiteSpace: "nowrap",
      ...v,
      ...hv,
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Button.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function Checkbox({
  label,
  description,
  checked,
  defaultChecked = false,
  onChange,
  disabled = false,
  inverse = false,
  name,
  value
}) {
  const [inner, setInner] = React.useState(defaultChecked);
  const on = checked ?? inner;
  const ink = inverse ? "var(--bt-white)" : "var(--bt-ink)",
    acc = inverse ? "var(--bt-salmon)" : "var(--bt-red)";
  const toggle = () => {
    if (disabled) return;
    const n = !on;
    setInner(n);
    onChange && onChange(n);
  };
  const box = {
    width: "18px",
    height: "18px",
    flex: "none",
    border: "1px solid " + (on ? acc : ink),
    background: on && acc,
    borderRadius: "var(--radius-none)",
    display: "grid",
    placeItems: "center",
    transition: "all var(--duration-fast) var(--ease-out)",
    marginTop: "2px"
  };
  return React.createElement("label", {
    onClick: e => {
      e.preventDefault();
      toggle();
    },
    style: {
      display: "flex",
      gap: "12px",
      alignItems: "flex-start",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? .4 : 1,
      fontFamily: "var(--font-body)",
      color: ink
    }
  }, React.createElement("input", {
    type: "checkbox",
    name,
    value,
    checked: on,
    readOnly: true,
    style: {
      position: "absolute",
      opacity: 0,
      width: 0,
      height: 0
    }
  }), React.createElement("span", {
    style: box
  }, on && React.createElement("span", {
    style: {
      width: "9px",
      height: "5px",
      borderLeft: "2px solid #fff",
      borderBottom: "2px solid #fff",
      transform: "translateY(-1px) rotate(-45deg)"
    }
  })), React.createElement("span", null, React.createElement("span", {
    style: {
      display: "block",
      font: "400 17px/1.3 var(--font-body)"
    }
  }, label), description && React.createElement("span", {
    style: {
      display: "block",
      font: "400 14px/1.3 var(--font-body)",
      color: inverse ? "rgba(255,255,255,.62)" : "var(--text-muted)"
    }
  }, description)));
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function Input({
  label,
  hint,
  error,
  placeholder,
  value,
  defaultValue,
  onChange,
  type = "text",
  multiline = false,
  rows = 4,
  disabled = false,
  inverse = false,
  style
}) {
  const [focus, setFocus] = React.useState(false);
  const ink = inverse ? "var(--bt-white)" : "var(--bt-ink)",
    muted = inverse ? "rgba(255,255,255,.62)" : "var(--text-muted)";
  const border = error ? "var(--status-negative)" : focus ? inverse ? "var(--bt-salmon)" : "var(--bt-red)" : inverse ? "rgba(255,255,255,.35)" : "var(--bt-ink-3)";
  const base = {
    width: "100%",
    boxSizing: "border-box",
    background: "transparent",
    color: ink,
    border: "none",
    borderBottom: "1px solid " + border,
    padding: "10px 0",
    font: "400 19px/1.3 var(--font-body)",
    outline: "none",
    transition: "border-color var(--duration-fast) var(--ease-out)",
    opacity: disabled ? .4 : 1,
    resize: "vertical",
    ...style
  };
  const el = multiline ? React.createElement("textarea", {
    rows,
    placeholder,
    value,
    defaultValue,
    disabled,
    onChange: e => onChange && onChange(e.target.value),
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: base
  }) : React.createElement("input", {
    type,
    placeholder,
    value,
    defaultValue,
    disabled,
    onChange: e => onChange && onChange(e.target.value),
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: base
  });
  return React.createElement("label", {
    style: {
      display: "block",
      fontFamily: "var(--font-body)"
    }
  }, label && React.createElement("span", {
    style: {
      display: "block",
      font: "400 12px/1 var(--font-body)",
      letterSpacing: ".14em",
      textTransform: "uppercase",
      color: error ? "var(--status-negative)" : muted,
      marginBottom: "2px"
    }
  }, label), el, (error || hint) && React.createElement("span", {
    style: {
      display: "block",
      font: "400 14px/1.3 var(--font-body)",
      color: error ? "var(--status-negative)" : muted,
      marginTop: "6px"
    }
  }, error || hint));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Radio.jsx
try { (() => {
function Radio({
  label,
  description,
  checked,
  defaultChecked = false,
  onChange,
  disabled = false,
  inverse = false,
  name,
  value
}) {
  const [inner, setInner] = React.useState(defaultChecked);
  const on = checked ?? inner;
  const ink = inverse ? "var(--bt-white)" : "var(--bt-ink)",
    acc = inverse ? "var(--bt-salmon)" : "var(--bt-red)";
  const toggle = () => {
    if (disabled) return;
    const n = true;
    setInner(n);
    onChange && onChange(value);
  };
  const box = {
    width: "18px",
    height: "18px",
    flex: "none",
    border: "1px solid " + (on ? acc : ink),
    background: on && "transparent",
    borderRadius: "50%",
    display: "grid",
    placeItems: "center",
    transition: "all var(--duration-fast) var(--ease-out)",
    marginTop: "2px"
  };
  return React.createElement("label", {
    onClick: e => {
      e.preventDefault();
      toggle();
    },
    style: {
      display: "flex",
      gap: "12px",
      alignItems: "flex-start",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? .4 : 1,
      fontFamily: "var(--font-body)",
      color: ink
    }
  }, React.createElement("input", {
    type: "radio",
    name,
    value,
    checked: on,
    readOnly: true,
    style: {
      position: "absolute",
      opacity: 0,
      width: 0,
      height: 0
    }
  }), React.createElement("span", {
    style: box
  }, on && React.createElement("span", {
    style: {
      width: "8px",
      height: "8px",
      borderRadius: "50%",
      background: acc
    }
  })), React.createElement("span", null, React.createElement("span", {
    style: {
      display: "block",
      font: "400 17px/1.3 var(--font-body)"
    }
  }, label), description && React.createElement("span", {
    style: {
      display: "block",
      font: "400 14px/1.3 var(--font-body)",
      color: inverse ? "rgba(255,255,255,.62)" : "var(--text-muted)"
    }
  }, description)));
}
Object.assign(__ds_scope, { Radio });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Radio.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function Select({
  label,
  options = [],
  value,
  defaultValue,
  onChange,
  placeholder = "Select",
  disabled = false,
  inverse = false,
  style
}) {
  const ink = inverse ? "var(--bt-white)" : "var(--bt-ink)",
    muted = inverse ? "rgba(255,255,255,.62)" : "var(--text-muted)";
  return React.createElement("label", {
    style: {
      display: "block"
    }
  }, label && React.createElement("span", {
    style: {
      display: "block",
      font: "400 12px/1 var(--font-body)",
      letterSpacing: ".14em",
      textTransform: "uppercase",
      color: muted,
      marginBottom: "2px"
    }
  }, label), React.createElement("span", {
    style: {
      position: "relative",
      display: "block"
    }
  }, React.createElement("select", {
    value,
    defaultValue: value === undefined ? defaultValue ?? "" : undefined,
    disabled,
    onChange: e => onChange && onChange(e.target.value),
    style: {
      width: "100%",
      appearance: "none",
      WebkitAppearance: "none",
      background: "transparent",
      color: ink,
      border: "none",
      borderBottom: "1px solid " + (inverse ? "rgba(255,255,255,.35)" : "var(--bt-ink-3)"),
      padding: "10px 28px 10px 0",
      font: "400 19px/1.3 var(--font-body)",
      outline: "none",
      opacity: disabled ? .4 : 1,
      cursor: "pointer",
      ...style
    }
  }, React.createElement("option", {
    value: "",
    disabled: true
  }, placeholder), options.map(o => {
    const v = typeof o === "string" ? o : o.value,
      l = typeof o === "string" ? o : o.label;
    return React.createElement("option", {
      key: v,
      value: v
    }, l);
  })), React.createElement("span", {
    "aria-hidden": true,
    style: {
      position: "absolute",
      right: "4px",
      top: "50%",
      transform: "translateY(-60%) rotate(45deg)",
      width: "8px",
      height: "8px",
      borderRight: "1px solid " + ink,
      borderBottom: "1px solid " + ink,
      pointerEvents: "none"
    }
  })));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
function Switch({
  label,
  checked,
  defaultChecked = false,
  onChange,
  disabled = false,
  inverse = false
}) {
  const [inner, setInner] = React.useState(defaultChecked);
  const on = checked ?? inner;
  const acc = inverse ? "var(--bt-salmon)" : "var(--bt-red)",
    ink = inverse ? "var(--bt-white)" : "var(--bt-ink)";
  return React.createElement("label", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "12px",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? .4 : 1,
      color: ink,
      font: "400 17px/1 var(--font-body)"
    }
  }, React.createElement("button", {
    type: "button",
    role: "switch",
    "aria-checked": on,
    disabled,
    onClick: () => {
      const n = !on;
      setInner(n);
      onChange && onChange(n);
    },
    style: {
      width: "40px",
      height: "22px",
      padding: "2px",
      border: "1px solid " + (on ? acc : ink),
      background: on ? acc : "transparent",
      borderRadius: "var(--radius-pill)",
      position: "relative",
      cursor: "inherit",
      transition: "all var(--duration-base) var(--ease-out)"
    }
  }, React.createElement("span", {
    style: {
      display: "block",
      width: "16px",
      height: "16px",
      borderRadius: "50%",
      background: on ? "#fff" : ink,
      transform: on ? "translateX(18px)" : "translateX(0)",
      transition: "transform var(--duration-base) var(--ease-out)"
    }
  })), label && React.createElement("span", null, label));
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/overlay/Dialog.jsx
try { (() => {
function Dialog({
  open,
  onClose,
  eyebrow,
  title,
  children,
  actions,
  width = 560
}) {
  if (!open) return null;
  return React.createElement("div", {
    onClick: onClose,
    style: {
      position: "fixed",
      inset: 0,
      background: "rgba(32,30,29,.6)",
      display: "grid",
      placeItems: "center",
      zIndex: 100,
      padding: "24px"
    }
  }, React.createElement("div", {
    role: "dialog",
    "aria-modal": true,
    onClick: e => e.stopPropagation(),
    style: {
      width: "100%",
      maxWidth: width + "px",
      background: "var(--bt-white)",
      borderRadius: "var(--radius-md)",
      boxShadow: "var(--shadow-float)",
      padding: "32px",
      display: "grid",
      gap: "14px",
      color: "var(--bt-ink)"
    }
  }, eyebrow && React.createElement("div", {
    style: {
      font: "400 12px/1 var(--font-body)",
      letterSpacing: ".42em",
      textTransform: "uppercase",
      color: "var(--bt-red)"
    }
  }, eyebrow), title && React.createElement("h2", {
    style: {
      margin: 0,
      font: "900 28px/1.1 var(--font-display)"
    }
  }, title), children && React.createElement("div", {
    style: {
      font: "400 17px/1.4 var(--font-body)",
      color: "var(--text-muted)"
    }
  }, children), actions && React.createElement("div", {
    style: {
      display: "flex",
      gap: "10px",
      justifyContent: "flex-end",
      marginTop: "8px"
    }
  }, actions)));
}
Object.assign(__ds_scope, { Dialog });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/overlay/Dialog.jsx", error: String((e && e.message) || e) }); }

// components/overlay/Tabs.jsx
try { (() => {
function Tabs({
  items = [],
  value,
  defaultValue,
  onChange,
  inverse = false
}) {
  const [inner, setInner] = React.useState(defaultValue ?? (items[0] && (items[0].value ?? items[0])));
  const cur = value ?? inner;
  const ink = inverse ? "var(--bt-white)" : "var(--bt-ink)",
    acc = inverse ? "var(--bt-salmon)" : "var(--bt-red)";
  return React.createElement("div", {
    role: "tablist",
    style: {
      display: "flex",
      gap: "28px",
      borderBottom: "1px solid " + (inverse ? "rgba(255,255,255,.18)" : "var(--bt-stone)")
    }
  }, items.map(it => {
    const v = it.value ?? it,
      l = it.label ?? it,
      on = v === cur;
    return React.createElement("button", {
      key: v,
      role: "tab",
      "aria-selected": on,
      type: "button",
      onClick: () => {
        setInner(v);
        onChange && onChange(v);
      },
      style: {
        all: "unset",
        cursor: "pointer",
        padding: "10px 0 12px",
        marginBottom: "-1px",
        font: "400 14px/1 var(--font-body)",
        letterSpacing: ".16em",
        textTransform: "uppercase",
        color: on ? ink : inverse ? "rgba(255,255,255,.62)" : "var(--text-muted)",
        borderBottom: "2px solid " + (on ? acc : "transparent"),
        transition: "color var(--duration-fast) var(--ease-out)"
      }
    }, l);
  }));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/overlay/Tabs.jsx", error: String((e && e.message) || e) }); }

// components/overlay/Toast.jsx
try { (() => {
function Toast({
  children,
  tone = "ink",
  action,
  onAction,
  style
}) {
  const bg = {
    ink: "var(--bt-ink)",
    accent: "var(--bt-red)",
    amber: "var(--bt-amber)"
  }[tone];
  const fg = tone === "amber" ? "var(--bt-ink)" : "var(--bt-white)";
  return React.createElement("div", {
    role: "status",
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "20px",
      background: bg,
      color: fg,
      padding: "14px 20px",
      font: "400 16px/1.3 var(--font-body)",
      boxShadow: "var(--shadow-float)",
      ...style
    }
  }, React.createElement("span", null, children), action && React.createElement("button", {
    type: "button",
    onClick: onAction,
    style: {
      all: "unset",
      cursor: "pointer",
      font: "700 13px/1 var(--font-body)",
      letterSpacing: ".14em",
      textTransform: "uppercase",
      color: tone === "ink" ? "var(--bt-salmon)" : fg
    }
  }, action));
}
Object.assign(__ds_scope, { Toast });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/overlay/Toast.jsx", error: String((e && e.message) || e) }); }

// components/overlay/Tooltip.jsx
try { (() => {
function Tooltip({
  label,
  children,
  side = "top"
}) {
  const [on, setOn] = React.useState(false);
  const pos = {
    top: {
      bottom: "calc(100% + 8px)",
      left: "50%",
      transform: "translateX(-50%)"
    },
    bottom: {
      top: "calc(100% + 8px)",
      left: "50%",
      transform: "translateX(-50%)"
    },
    right: {
      left: "calc(100% + 8px)",
      top: "50%",
      transform: "translateY(-50%)"
    },
    left: {
      right: "calc(100% + 8px)",
      top: "50%",
      transform: "translateY(-50%)"
    }
  }[side];
  return React.createElement("span", {
    onMouseEnter: () => setOn(true),
    onMouseLeave: () => setOn(false),
    onFocus: () => setOn(true),
    onBlur: () => setOn(false),
    style: {
      position: "relative",
      display: "inline-flex"
    }
  }, children, on && React.createElement("span", {
    role: "tooltip",
    style: {
      position: "absolute",
      ...pos,
      background: "var(--bt-ink)",
      color: "var(--bt-white)",
      padding: "6px 10px",
      font: "400 13px/1.3 var(--font-body)",
      whiteSpace: "nowrap",
      zIndex: 50,
      pointerEvents: "none"
    }
  }, label));
}
Object.assign(__ds_scope, { Tooltip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/overlay/Tooltip.jsx", error: String((e && e.message) || e) }); }

// ui_kits/deck/slides.jsx
try { (() => {
// Slide components recreated from "Beyond Tenun Fundraising Deck v3" (Canva, 1920×1080). Authored at 1280×720 (values = deck ÷ 1.5).
const DS = window.BeyondTenunDesignSystem_9d918e;
const {
  Eyebrow,
  Stat,
  Step,
  Button
} = DS;
const M = 80,
  MY = 64; // margins
function Frame({
  dark = false,
  image,
  scrim,
  children,
  label
}) {
  return /*#__PURE__*/React.createElement("section", {
    "data-screen-label": label,
    style: {
      width: 1280,
      height: 720,
      position: "relative",
      overflow: "hidden",
      background: dark ? "var(--bt-ink)" : "var(--bt-paper)",
      color: dark ? "#fff" : "var(--bt-ink)",
      fontFamily: "var(--font-body)"
    }
  }, image && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      background: "url(" + image + ") center/cover",
      filter: "var(--photo-filter)"
    }
  }), scrim && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      background: scrim
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: MY + "px " + M + "px",
      display: "flex",
      flexDirection: "column"
    }
  }, children));
}
function Footer({
  children,
  dark
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "auto",
      paddingTop: 12,
      borderTop: "1px solid " + (dark ? "rgba(255,255,255,.18)" : "var(--bt-stone)"),
      font: "400 11px/1.4 var(--font-body)",
      letterSpacing: ".12em",
      textTransform: "uppercase",
      color: dark ? "rgba(255,255,255,.62)" : "var(--text-muted)"
    }
  }, children);
}
const H1 = ({
  children,
  dark,
  size = 56,
  width = "72%"
}) => /*#__PURE__*/React.createElement("h1", {
  style: {
    font: "900 " + size + "px/1.02 var(--font-display)",
    letterSpacing: "-.02em",
    maxWidth: width,
    color: dark ? "#fff" : "var(--bt-ink)"
  }
}, children);
const Body = ({
  children,
  dark,
  muted = true
}) => /*#__PURE__*/React.createElement("p", {
  style: {
    font: "400 15px/1.45 var(--font-body)",
    color: dark ? muted ? "rgba(255,255,255,.72)" : "#fff" : muted ? "var(--text-muted)" : "var(--bt-ink)"
  }
}, children);
function TitleSlide() {
  return /*#__PURE__*/React.createElement(Frame, {
    dark: true,
    label: "01 Title"
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    inverse: true
  }, "TBN Conference 2026 \xB7 Impact Partnership"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 120
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "400 24px/1.2 var(--font-display)",
      color: "rgba(255,255,255,.72)"
    }
  }, "AI is becoming more intelligent."), /*#__PURE__*/React.createElement(H1, {
    dark: true,
    size: 60,
    width: "78%"
  }, "How do we make sure the wisdom held by communities is not left behind?")), /*#__PURE__*/React.createElement(Footer, {
    dark: true
  }, "Impact Creative Management ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--bt-salmon)"
    }
  }, "\xD7"), " Transformational Business Network ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--bt-salmon)"
    }
  }, "\xD7"), " Torajamelo"));
}
function StatementSlide() {
  return /*#__PURE__*/React.createElement(Frame, {
    label: "02 Statement",
    image: "../../assets/imagery/weaving-hands-loom.jpg",
    scrim: "var(--scrim-left)"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "auto",
      marginBottom: "auto"
    }
  }, /*#__PURE__*/React.createElement(H1, {
    dark: true,
    size: 72,
    width: "70%"
  }, "Restore. Regenerate. Flourish.")));
}
function ProblemSlide() {
  return /*#__PURE__*/React.createElement(Frame, {
    label: "03 Why this matters"
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Why this matters"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1.15fr 1fr",
      gap: 48,
      marginTop: 28,
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(H1, {
    size: 38,
    width: "100%"
  }, "What happens when disaster does not only destroy homes, but also interrupts livelihoods, knowledge, identity and opportunity?"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: 14,
      marginTop: 32
    }
  }, [["Livelihood interrupted", "Income from land and loom stops while the cost of living carries on."], ["Knowledge transfer interrupted", "Teaching moves to survival. What elders hold is not passed on during a shock."], ["Identity and opportunity interrupted", "People are left to rebuild as beneficiaries instead of as owners of their own capacity."]].map(([t, d]) => /*#__PURE__*/React.createElement("div", {
    key: t,
    style: {
      borderTop: "1px solid var(--bt-stone)",
      paddingTop: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "700 15px/1.3 var(--font-body)"
    }
  }, t), /*#__PURE__*/React.createElement(Body, null, d))))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "url(../../assets/imagery/tenun-hanging.jpg) center/cover",
      filter: "var(--photo-filter)"
    }
  })), /*#__PURE__*/React.createElement(Footer, null, "These communities are not short of intelligence, skill, relationships or assets. Field mapping in Adonara, Lembata and Manggarai currently lists 580 active weavers."));
}
function StepsSlide() {
  const steps = [["Seed", "Restore land, cotton and local ecological knowledge."], ["Loom", "Strengthen skills, culture and women's livelihood."], ["Trace", "Connect weaver, product, story, provenance and impact."], ["Teach", "Build teacher capacity and co-create a locally rooted curriculum."], ["Regenerate", "Climate action beyond carbon, linking ecology, livelihoods and culture."], ["Hub", "A Local Impact Hub for capacity building, incubation and enterprise development."], ["Flourish", "Strengthen agency, dignity, resilience and future opportunity."]];
  return /*#__PURE__*/React.createElement(Frame, {
    label: "04 How it works"
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "How it works"), /*#__PURE__*/React.createElement(H1, {
    size: 30,
    width: "100%"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 400
    }
  }, "Seed \u2192 Loom \u2192 Trace \u2192 Teach \u2192 Regenerate \u2192 Hub \u2192 "), "Flourish"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(4,1fr)",
      gap: "28px 32px",
      marginTop: 28
    }
  }, steps.map(([t, d], i) => /*#__PURE__*/React.createElement(Step, {
    key: t,
    number: i + 1,
    title: t,
    style: {
      fontSize: 13
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      lineHeight: 1.35,
      display: "block"
    }
  }, d))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--bt-ink)",
      color: "#fff",
      padding: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "400 11px/1 var(--font-body)",
      letterSpacing: ".32em",
      color: "var(--bt-salmon)"
    }
  }, "WHY THIS ORDER"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "400 13px/1.4 var(--font-body)",
      marginTop: 10,
      color: "rgba(255,255,255,.8)"
    }
  }, "Each step only holds if the one before it is in place. That is why it is funded as one pathway and not as seven grants."))), /*#__PURE__*/React.createElement(Footer, null, "Seed to Loom is framed as revival and strengthening because the land, buildings, weaving skills and trusted organizations already exist"));
}
function StatsSlide() {
  return /*#__PURE__*/React.createElement(Frame, {
    dark: true,
    label: "05 TBN-aligned outputs"
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    inverse: true
  }, "TBN-aligned outputs"), /*#__PURE__*/React.createElement(H1, {
    dark: true,
    size: 40,
    width: "80%"
  }, "An enterprise-development pipeline, not only a resilience program."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 48,
      marginTop: 40
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Stat, {
    inverse: true,
    accent: true,
    value: ">1,000",
    label: "sociopreneurs developed",
    size: "lg"
  }), /*#__PURE__*/React.createElement(Body, {
    dark: true
  }, "Through training, mentoring, community practice and Local Impact Hub pathways.")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Stat, {
    inverse: true,
    accent: true,
    value: ">5",
    label: "new social enterprises",
    size: "lg"
  }), /*#__PURE__*/React.createElement(Body, {
    dark: true
  }, "Incubated or launched from community opportunities identified through the program."))), /*#__PURE__*/React.createElement(Footer, {
    dark: true
  }, "These are program targets to be measured over the three-year pilot, not guaranteed outcomes."));
}
function TableSlide() {
  const rows = [["Lodan Due · Senitawa", "Adonara, East Flores", "PEGAS PEKKA", "250"], ["Kerubaki", "Lembata", "PEGAS PEKKA", "incl. above"], ["Doka", "Sikka, Flores", "Sanggar Doka Tawa Tana", "80"], ["Cibal", "Manggarai", "DEKRANASDA Manggarai", "250"]];
  const th = {
    font: "400 11px/1 var(--font-body)",
    letterSpacing: ".2em",
    textTransform: "uppercase",
    color: "var(--text-muted)",
    textAlign: "left",
    padding: "0 0 10px",
    borderBottom: "1px solid var(--bt-ink)"
  };
  const td = {
    font: "400 16px/1.3 var(--font-body)",
    padding: "14px 0",
    borderBottom: "1px solid var(--bt-stone)",
    verticalAlign: "top"
  };
  return /*#__PURE__*/React.createElement(Frame, {
    label: "06 Six sites"
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Six sites \xB7 One shared recovery challenge"), /*#__PURE__*/React.createElement(H1, {
    size: 34,
    width: "80%"
  }, "The communities we sit with, and who already stands beside them."), /*#__PURE__*/React.createElement("table", {
    style: {
      width: "100%",
      borderCollapse: "collapse",
      marginTop: 28
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, ["Site", "District", "Local partner organization", "Weavers"].map(h => /*#__PURE__*/React.createElement("th", {
    key: h,
    style: {
      ...th,
      textAlign: h === "Weavers" ? "right" : "left"
    }
  }, h)))), /*#__PURE__*/React.createElement("tbody", null, rows.map(r => /*#__PURE__*/React.createElement("tr", {
    key: r[0]
  }, r.map((c, i) => /*#__PURE__*/React.createElement("td", {
    key: i,
    style: {
      ...td,
      textAlign: i === 3 ? "right" : "left",
      fontWeight: i === 0 ? 700 : 400
    }
  }, c)))), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
    colSpan: 3,
    style: {
      ...td,
      borderBottom: "none",
      font: "400 12px/1 var(--font-body)",
      letterSpacing: ".2em",
      textTransform: "uppercase",
      color: "var(--text-muted)"
    }
  }, "Mapped to date"), /*#__PURE__*/React.createElement("td", {
    style: {
      ...td,
      borderBottom: "none",
      textAlign: "right",
      font: "900 28px/1 var(--font-display)",
      color: "var(--bt-red)"
    }
  }, "580")))), /*#__PURE__*/React.createElement(Footer, null, "Three shocks in six years \xB7 COVID-19 \xB7 Cyclone Seroja \xB7 2026 earthquake"));
}
function ClosingSlide() {
  return /*#__PURE__*/React.createElement(Frame, {
    dark: true,
    label: "07 The invitation"
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    inverse: true
  }, "The invitation"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 48,
      marginTop: 24,
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Stat, {
    inverse: true,
    accent: true,
    value: "USD 1M",
    size: "xl"
  }), /*#__PURE__*/React.createElement(Body, {
    dark: true,
    muted: false
  }, "for a three-year Beyond Tenun Impact Partnership. We are building a small consortium of committed Impact Partners who will walk with the communities from restoration to regeneration and flourishing."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 24,
      display: "flex",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Button, {
    inverse: true
  }, "Join the 3-year journey"), /*#__PURE__*/React.createElement(Button, {
    inverse: true,
    variant: "secondary"
  }, "Continue the conversation"))), /*#__PURE__*/React.createElement("div", {
    style: {
      alignSelf: "end"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "400 11px/1 var(--font-body)",
      letterSpacing: ".32em",
      color: "var(--bt-salmon)"
    }
  }, "INDICATIVE USE OF FUNDS"), [["Assessment trip and post-assessment, six sites", "USD 20,000"], ["Community program, three communities × three years", "USD 900,000"], ["Technology platform, local curriculum, Hub coordination", "balance · to confirm"]].map(([a, b]) => /*#__PURE__*/React.createElement("div", {
    key: a,
    style: {
      display: "flex",
      justifyContent: "space-between",
      gap: 16,
      padding: "12px 0",
      borderBottom: "1px solid rgba(255,255,255,.18)",
      font: "400 14px/1.3 var(--font-body)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "rgba(255,255,255,.8)"
    }
  }, a), /*#__PURE__*/React.createElement("span", {
    style: {
      whiteSpace: "nowrap"
    }
  }, b))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      padding: "12px 0",
      font: "700 14px/1.3 var(--font-body)"
    }
  }, /*#__PURE__*/React.createElement("span", null, "Toward >1,000 sociopreneurs and >5 new social enterprises"), /*#__PURE__*/React.createElement("span", null, "USD 1,000,000")))), /*#__PURE__*/React.createElement(Footer, {
    dark: true
  }, "Not a one-off sponsorship. Not crowdfunding. Suitable capital: grants, philanthropic funding, catalytic capital, corporate or foundation partnership."));
}
Object.assign(window, {
  TitleSlide,
  StatementSlide,
  ProblemSlide,
  StepsSlide,
  StatsSlide,
  TableSlide,
  ClosingSlide,
  SlideFrame: Frame
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/deck/slides.jsx", error: String((e && e.message) || e) }); }

// ui_kits/traceable-weaver/screens.jsx
try { (() => {
// Traceable Weaver experience — demo prototype described in brief §5.10. All names, places and stories are SAMPLE / DEMO content.
const DS = window.BeyondTenunDesignSystem_9d918e;
const {
  Eyebrow,
  Button,
  Tabs,
  Step,
  Badge,
  Tag,
  Card,
  Stat
} = DS;
const W = 390,
  H = 844;
function Phone({
  children,
  dark
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: W,
      height: H,
      background: dark ? "var(--bt-ink)" : "var(--bt-paper)",
      color: dark ? "#fff" : "var(--bt-ink)",
      position: "relative",
      overflow: "hidden",
      fontFamily: "var(--font-body)",
      display: "flex",
      flexDirection: "column"
    }
  }, children);
}
function TopBar({
  title,
  onBack,
  dark
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      padding: "56px 20px 12px",
      font: "400 12px/1 var(--font-body)",
      letterSpacing: ".32em",
      textTransform: "uppercase",
      color: dark ? "var(--bt-salmon)" : "var(--bt-red)"
    }
  }, onBack && /*#__PURE__*/React.createElement("button", {
    onClick: onBack,
    "aria-label": "Back",
    style: {
      all: "unset",
      cursor: "pointer",
      width: 44,
      height: 44,
      marginLeft: -12,
      display: "grid",
      placeItems: "center"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 10,
      height: 10,
      borderLeft: "1.5px solid currentColor",
      borderBottom: "1.5px solid currentColor",
      transform: "rotate(45deg)",
      display: "block",
      color: dark ? "#fff" : "var(--bt-ink)"
    }
  })), /*#__PURE__*/React.createElement("span", null, title));
}
function Demo() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: 14,
      left: 0,
      right: 0,
      textAlign: "center",
      font: "700 9px/1 var(--font-body)",
      letterSpacing: ".24em",
      color: "var(--bt-amber)"
    }
  }, "SAMPLE / DEMO CONTENT");
}
function ScanScreen({
  go
}) {
  return /*#__PURE__*/React.createElement(Phone, {
    dark: true
  }, /*#__PURE__*/React.createElement(Demo, null), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "80px 24px 0"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    inverse: true
  }, "Traceable Weaver"), /*#__PURE__*/React.createElement("h1", {
    style: {
      font: "900 34px/1.02 var(--font-display)",
      letterSpacing: "-.02em",
      marginTop: 16
    }
  }, "A tag in the cloth carries the maker's record to you.")), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      margin: "32px 24px",
      background: "url(../../assets/imagery/tenun-hands-detail.jpg) center/cover",
      filter: "var(--photo-filter)",
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      background: "var(--scrim-bottom)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 16,
      bottom: 16,
      right: 16,
      font: "400 13px/1.4 var(--font-body)",
      color: "rgba(255,255,255,.8)"
    }
  }, "Hold your phone to the NFC tag inside the selvedge, or scan the QR on the card.")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 24px 40px",
      display: "grid",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Button, {
    inverse: true,
    fullWidth: true,
    onClick: go
  }, "Read this cloth"), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      font: "400 11px/1 var(--font-body)",
      letterSpacing: ".12em",
      textTransform: "uppercase",
      color: "rgba(255,255,255,.5)"
    }
  }, "Beyond Tenun \xB7 Seed to Loom")));
}
function WeaverScreen({
  go,
  back
}) {
  return /*#__PURE__*/React.createElement(Phone, null, /*#__PURE__*/React.createElement(Demo, null), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 300,
      background: "url(../../assets/imagery/weaver-portrait.jpg) center/cover",
      filter: "var(--photo-filter)",
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      background: "var(--scrim-bottom)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0
    }
  }, /*#__PURE__*/React.createElement(TopBar, {
    title: "Meet the weaver",
    onBack: back,
    dark: true
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 20,
      bottom: 18,
      color: "#fff"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "400 11px/1 var(--font-body)",
      letterSpacing: ".32em",
      color: "var(--bt-salmon)"
    }
  }, "SAMPLE WEAVER"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "900 30px/1 var(--font-display)",
      marginTop: 6
    }
  }, "Mama [Name]"))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "18px 20px",
      display: "grid",
      gap: 14,
      flex: 1,
      overflow: "auto"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(Tag, null, "Adonara"), /*#__PURE__*/React.createElement(Tag, null, "PEGAS PEKKA"), /*#__PURE__*/React.createElement(Tag, {
    tone: "soft"
  }, "Cloth no. 0042")), /*#__PURE__*/React.createElement("p", {
    style: {
      font: "400 16px/1.45 var(--font-body)",
      color: "var(--text-muted)"
    }
  }, "[Demo] Weaving since she was twelve, taught by her mother on the same back-strap loom. This cloth took eleven weeks, including the natural indigo dye baths."), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: "1px solid var(--bt-stone)",
      paddingTop: 12,
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(Stat, {
    value: "11",
    label: "weeks on the loom",
    size: "md"
  }), /*#__PURE__*/React.createElement(Stat, {
    value: "3",
    label: "dye baths, natural indigo",
    size: "md"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 20px 32px"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    fullWidth: true,
    onClick: go
  }, "Material, technique & motif")));
}
function ClothScreen({
  go,
  back
}) {
  const [t, setT] = React.useState("Material");
  const copy = {
    Material: ["Hand-spun local cotton", "[Demo] Cotton grown on a community plot in Adonara, carded and spun by hand. Dyed with indigo leaf and morinda root — no synthetic thread."],
    Technique: ["Back-strap ikat", "[Demo] Warp threads are tied and dyed before weaving so the pattern emerges as the cloth is woven. One weaver, one loom, one length."],
    Motif: ["What the motif is allowed to say", "[Demo] This motif is worn at family ceremonies. The community decides what may be recorded and shown; some meanings stay with the weavers."]
  };
  return /*#__PURE__*/React.createElement(Phone, null, /*#__PURE__*/React.createElement(Demo, null), /*#__PURE__*/React.createElement(TopBar, {
    title: "The cloth",
    onBack: back
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 20px"
    }
  }, /*#__PURE__*/React.createElement(Tabs, {
    items: ["Material", "Technique", "Motif"],
    value: t,
    onChange: setT
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      margin: "20px 20px 0",
      height: 220,
      background: "url(../../assets/imagery/tenun-hanging.jpg) center/cover",
      filter: "var(--photo-filter)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "20px 20px 0",
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      font: "900 26px/1.05 var(--font-display)",
      letterSpacing: "-.01em"
    }
  }, copy[t][0]), /*#__PURE__*/React.createElement("p", {
    style: {
      font: "400 16px/1.45 var(--font-body)",
      color: "var(--text-muted)",
      marginTop: 12
    }
  }, copy[t][1])), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 20px 32px"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    fullWidth: true,
    onClick: go
  }, "Seed-to-Loom journey")));
}
function JourneyScreen({
  go,
  back
}) {
  const steps = [["Seed", "Cotton planted, Adonara plot"], ["Loom", "Woven over eleven weeks"], ["Trace", "Tag written, record attached"], ["Teach", "Motif documented for the local curriculum"], ["Hub", "Sold through the Local Impact Hub"]];
  return /*#__PURE__*/React.createElement(Phone, {
    dark: true
  }, /*#__PURE__*/React.createElement(Demo, null), /*#__PURE__*/React.createElement(TopBar, {
    title: "Seed to Loom",
    onBack: back,
    dark: true
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "8px 20px 0",
      flex: 1,
      display: "grid",
      gap: 18,
      alignContent: "start"
    }
  }, steps.map(([t, d], i) => /*#__PURE__*/React.createElement(Step, {
    key: t,
    inverse: true,
    number: i + 1,
    title: t
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14
    }
  }, d)))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 20px 32px"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    inverse: true,
    fullWidth: true,
    onClick: go
  }, "Where the value goes")));
}
function ImpactScreen({
  back,
  restart
}) {
  return /*#__PURE__*/React.createElement(Phone, null, /*#__PURE__*/React.createElement(Demo, null), /*#__PURE__*/React.createElement(TopBar, {
    title: "Impact",
    onBack: back
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "8px 20px 0",
      display: "grid",
      gap: 16,
      flex: 1,
      alignContent: "start"
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      font: "900 30px/1.02 var(--font-display)",
      letterSpacing: "-.02em"
    }
  }, "Value returns to the people who hold the knowledge."), /*#__PURE__*/React.createElement(Card, {
    tone: "tint",
    eyebrow: "This cloth",
    title: "Income reaches the household"
  }, "[Demo] The weaver's share is recorded against this tag. On resale, the record stays attached."), /*#__PURE__*/React.createElement(Card, {
    eyebrow: "Community",
    title: "Adonara \xB7 250 weavers mapped",
    footer: "PEGAS PEKKA"
  }, "Part of a three-year pilot across Adonara, Lembata and Manggarai."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(Badge, null, "Pilot 2026\u20132029"), /*#__PURE__*/React.createElement(Badge, {
    tone: "amber"
  }, "Demo record"))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 20px 32px",
      display: "grid",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Button, {
    fullWidth: true
  }, "Join the 3-year journey"), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    fullWidth: true,
    onClick: restart
  }, "Start over")));
}
Object.assign(window, {
  ScanScreen,
  WeaverScreen,
  ClothScreen,
  JourneyScreen,
  ImpactScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/traceable-weaver/screens.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Eyebrow = __ds_scope.Eyebrow;

__ds_ns.Quote = __ds_scope.Quote;

__ds_ns.Stat = __ds_scope.Stat;

__ds_ns.Step = __ds_scope.Step;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Radio = __ds_scope.Radio;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.Dialog = __ds_scope.Dialog;

__ds_ns.Tabs = __ds_scope.Tabs;

__ds_ns.Toast = __ds_scope.Toast;

__ds_ns.Tooltip = __ds_scope.Tooltip;

})();
