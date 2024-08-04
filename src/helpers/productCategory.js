export const productCategory = [
  { id: 1, label: "Auriculares inalámbricos", value: "wireless_headphones" },
  { id: 2, label: "Cámaras", value: "cameras" },
  { id: 3, label: "Auriculares", value: "headphones" },
  { id: 4, label: "Móviles", value: "mobiles" },
  { id: 5, label: "Ratones", value: "mice" },
  { id: 6, label: "Impresoras", value: "printers" },
  { id: 7, label: "Procesadores", value: "processors" },
  { id: 8, label: "Refrigeradores", value: "refrigerators" },
  { id: 9, label: "Altavoces", value: "speakers" },
  { id: 10, label: "Recortadoras", value: "trimmers" },
  { id: 11, label: "Televisores", value: "televisions" },
  { id: 12, label: "Relojes", value: "watches" },
  { id: 13, label: "Tarjetas Gráficas", value: "graphics_cards" },
  { id: 14, label: "Memorias RAM", value: "ram" },
  { id: 15, label: "Consolas", value: "consoles" },
  { id: 16, label: "Portátiles", value: "laptops" },
  { id: 17, label: "Tabletas", value: "tablets" },
  { id: 18, label: "Teclados", value: "keyboards" },
  { id: 19, label: "Monitores", value: "monitors" },
  { id: 20, label: "Discos Duros", value: "hard_drives" },
  { id: 21, label: "Unidades SSD", value: "ssds" },
  { id: 22, label: "Cables y Adaptadores", value: "cables_adapters" },
  { id: 23, label: "Routers", value: "routers" },
  { id: 24, label: "Repetidores WiFi", value: "wifi_repeaters" },
  { id: 25, label: "Accesorios para Gaming", value: "gaming_accessories" },
  { id: 26, label: "Drones", value: "drones" },
  { id: 27, label: "Smart Home", value: "smart_home" },
  { id: 28, label: "Proyectores", value: "projectors" },
  { id: 29, label: "Software", value: "software" },
  { id: 30, label: "Componentes de PC", value: "pc_components" },
  { id: 31, label: "Fuentes de Alimentación", value: "power_supplies" },
  { id: 32, label: "Sillas para Gaming", value: "gaming_chairs" },
  { id: 33, label: "Placas Madre", value: "motherboards"}
];

export const getCategoryLabel = (value) => {
  const category = productCategory.find(category => category.value === value);
  return category ? category.label : null;
};
