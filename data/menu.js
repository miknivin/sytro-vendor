export const allHomepages = [
  {
    href: "/",
    imgSrc: "/images/demo/home-01.jpg",
    alt: "home-01",
    name: "Home Fashion 01",
    labels: ["New", "Trend"],
  },
  {
    href: "/home-03",
    imgSrc: "/images/demo/home-03.jpg",
    alt: "home-03",
    name: "Home Fashion 03",
  },
  {
    href: "/home-04",
    imgSrc: "/images/demo/home-04.jpg",
    alt: "home-04",
    name: "Home Fashion 04",
  },
];

export const demoItems = [
  {
    href: "/",
    src: "/images/demo/home-01.jpg",
    alt: "home-01",
    name: "Home Fashion 01",
    labels: [{ className: "demo-new", text: "New" }, { text: "Trend" }],
  },
  {
    href: "/home-03",
    src: "/images/demo/home-03.jpg",
    alt: "home-03",
    name: "Home Fashion 03",
  },
  {
    href: "/home-04",
    src: "/images/demo/home-04.jpg",
    alt: "home-04",
    name: "Home Fashion 04",
  },
];

export const productsPages = [
  {
    heading: "Shop layouts",
    links: [{ href: "/shop-collection-sub", text: "Sub collection" }],
  },
];

export const productDetailPages = [
  {
    heading: "Product layouts",
    links: [
      { href: "/product-detail/1", text: "Product default" },
      { href: "/product-no-zoom/14", text: "Product no zoom" },
    ],
  },
];

export const pages = [
  {
    href: "/about-us",
    text: "About us",
    className: "menu-link-text link text_black-2",
    links: null,
  },
  {
    href: "#",
    text: "Brands",
    className: "menu-link-text link text_black-2",
    links: [
      {
        href: "/brands",
        text: "Brands",
        className: "menu-link-text link text_black-2 position-relative",
        label: "New",
      },
      {
        href: "/brands-v2",
        text: "Brand V2",
        className: "menu-link-text link text_black-2",
      },
    ],
  },
  {
    href: "#",
    text: "Contact",
    className: "menu-link-text link text_black-2",
    links: [
      {
        href: "/contact-1",
        text: "Contact 1",
        className: "menu-link-text link text_black-2",
      },
      {
        href: "/contact-2",
        text: "Contact 2",
        className: "menu-link-text link text_black-2",
      },
    ],
  },
  {
    href: "#",
    text: "FAQ",
    className: "menu-link-text link text_black-2",
    links: [
      {
        href: "/faq-1",
        text: "FAQ 01",
        className: "menu-link-text link text_black-2",
      },
      {
        href: "/faq-2",
        text: "FAQ 02",
        className: "menu-link-text link text_black-2",
      },
    ],
  },
  {
    href: "#",
    text: "Store",
    className: "menu-link-text link text_black-2",
    links: [
      {
        href: "/our-store",
        text: "Our store",
        className: "menu-link-text link text_black-2",
      },
      {
        href: "/store-locations",
        text: "Store locator",
        className: "menu-link-text link text_black-2",
      },
    ],
  },
  {
    href: "/timeline",
    text: "Timeline",
    className: "menu-link-text link text_black-2 position-relative",
    label: "New",
  },
  {
    href: "/view-cart",
    text: "View cart",
    className: "menu-link-text link text_black-2 position-relative",
  },
  {
    href: "/checkout",
    text: "Check out",
    className: "menu-link-text link text_black-2 position-relative",
  },
  {
    href: "#",
    text: "Payment",
    className: "menu-link-text link text_black-2",
    links: [
      {
        href: "/payment-confirmation",
        text: "Payment Confirmation",
        className: "menu-link-text link text_black-2",
      },
      {
        href: "/payment-failure",
        text: "Payment Failure",
        className: "menu-link-text link text_black-2",
      },
    ],
  },
  {
    href: "#",
    text: "My account",
    className: "menu-link-text link text_black-2",
    links: [
      {
        href: "/my-account",
        text: "My account",
        className: "menu-link-text link text_black-2",
      },
      {
        href: "/my-account-orders",
        text: "My order",
        className: "menu-link-text link text_black-2",
      },
      {
        href: "/my-account-orders-details",
        text: "My order details",
        className: "menu-link-text link text_black-2",
      },
      {
        href: "/my-account-address",
        text: "My address",
        className: "menu-link-text link text_black-2",
      },
      {
        href: "/my-account-edit",
        text: "My account details",
        className: "menu-link-text link text_black-2",
      },
      {
        href: "/my-account-wishlist",
        text: "My wishlist",
        className: "menu-link-text link text_black-2",
      },
    ],
  },
  {
    href: "/invoice",
    text: "Invoice",
    className: "menu-link-text link text_black-2 position-relative",
  },
  {
    href: "/page-not-found",
    text: "404",
    className: "menu-link-text link text_black-2 position-relative",
  },
];

export const blogLinks = [
  
];

export const navItems = [
  {
    id: "dropdown-menu-one",
    label: "Home",
    links: [
      { href: "/", label: "Home Fashion 01" },
      { href: "/home-03", label: "Home Fashion 03" },
      { href: "/home-04", label: "Home Fashion 04" },
    ],
  },
  {
    id: "dropdown-menu-two",
    label: "Shop",
    links: [
      {
        id: "sub-shop-one",
        label: "Shop layouts",
        links: [{ href: "/shop-collection-sub", label: "Sub collection" }],
      },
    ],
  },
  {
    id: "dropdown-menu-three",
    label: "Products",
    links: [
      {
        id: "sub-product-one",
        label: "Product layouts",
        links: [
          { href: "/product-detail/1", label: "Product default" },
          { href: "/product-no-zoom/14", label: "Product no zoom" },
        ],
      },
    ],
  },
  {
    id: "dropdown-menu-four",
    label: "Pages",
    links: [
      { href: "/about-us", label: "About us" },
      { href: "/brands", label: "Brands", demoLabel: true },
      { href: "/brands-v2", label: "Brands V2" },
      { href: "/contact-1", label: "Contact 1" },
      { href: "/contact-2", label: "Contact 2" },
      { href: "/faq-1", label: "FAQ 01" },
      { href: "/faq-2", label: "FAQ 02" },
      { href: "/our-store", label: "Our store" },
      { href: "/store-locations", label: "Store locator" },
      { href: "/timeline", label: "Timeline", demoLabel: true },
      { href: "/view-cart", label: "View cart" },
      { href: "/my-account", label: "My account" },
      { href: "/wishlist", label: "Wishlist" },
      { href: "/terms", label: "Terms and conditions" },
      { href: "/page-not-found", label: "404 page" },
    ],
  },
];
