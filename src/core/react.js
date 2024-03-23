import { EL_KEY, CHILDREN_KEY } from "../share/enum";

function createElement(type, props, ...children) {
    const childs = children.map((child) =>
      typeof child === "string" ? createTextNode(child) : child
    );
  
    return {
      type,
      props: {
        ...props,
        [CHILDREN_KEY]: childs,
      },
    };
  }
  
  function createTextNode(val) {
    return {
      type: EL_KEY.TEXT,
      props: {
        nodeValue: val,
      },
    };
  }
  
  function render(el, container) {
    let dom;
    switch (el.type) {
      case EL_KEY.DIV:
        dom = document.createElement("div");
        break;
      case EL_KEY.TEXT:
        dom = document.createTextNode("");
        break;
      default:
        break;
    }
  
    Object.keys(el.props).forEach((propKey) => {
      if (propKey === CHILDREN_KEY) return;
      dom[propKey] = el.props[propKey];
    });
  
    const chidlren = el.props[CHILDREN_KEY];
    if (Array.isArray(chidlren)) {
      chidlren.forEach((child) => {
        render(child, dom);
      });
    }
  
    container.appendChild(dom);
  }
  
export default {
    render,
    createElement
}