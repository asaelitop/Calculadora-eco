# 🌱 Eco - Calcula

Aplicación web interactiva para calcular el costo energético y el impacto ambiental de tus aparatos electrónicos.

## 📋 Características Principales

### 1. **Registro de Aparatos Electrónicos**
- Agrega cualquier aparato electrónico con sus especificaciones
- Ingresa potencia en watts, horas de uso diario y precio del kWh
- Interfaz amigable y validación de datos

### 2. **Cálculo de Consumo Energético**
- **Fórmula utilizada**: `Consumo (kWh) = (Watts × Horas diarias) / 1000`
- Calcula consumo diario, mensual y anual
- Presenta costos en diferentes períodos de tiempo

### 3. **Análisis Gráfico**
- **Gráfica de barras**: Consumo por aparato (kWh/día)
- **Gráfica de barras**: Costo por aparato ($/día)
- **Gráfica de pastel**: Distribución de consumo (%)
- **Gráfica de línea**: Proyección mensual de costo

### 4. **Impacto Ambiental**
La aplicación calcula los siguientes contaminantes basados en el consumo energético:

#### **Emisiones de CO₂**
- **Factor**: 0.475 kg CO₂ por kWh (promedio México)
- Equivalencia con conducción vehicular (km)

#### **Partículas PM2.5**
- **Factor**: 0.08 mg PM2.5 por kWh
- Contaminante atmosférico que afecta la salud respiratoria

#### **Óxidos de Nitrógeno (NOx)**
- **Factor**: 0.35 g NOx por kWh
- Contribuye a la formación de ozono troposférico

#### **Dióxido de Azufre (SO₂)**
- **Factor**: 0.15 g SO₂ por kWh
- Causa lluvia ácida y problemas respiratorios

### 5. **Recomendaciones Personalizadas**
La aplicación genera recomendaciones basadas en el nivel de consumo:
- **Consumo bajo**: Felicitaciones y consejos para mantener el nivel
- **Consumo medio**: Sugerencias de optimización
- **Consumo alto**: Medidas urgentes para reducir consumo

### 6. **Persistencia de Datos**
- Los datos se guardan automáticamente en `localStorage`
- Los aparatos se mantienen incluso al cerrar la aplicación
- Opción para limpiar todos los datos

## 🎨 Diseño Visual

- **Color Primario**: Verde (#4CAF50)
- **Color Secundario**: Verde claro (#81C784)
- **Fondo**: Blanco (#FFFFFF)
- **Interfaz responsiva** adaptada para móviles, tablets y escritorio

## 💻 Tecnologías Utilizadas

- **HTML5**: Estructura semántica
- **CSS3**: Estilos avanzados con gradientes y animaciones
- **JavaScript (Vanilla)**: Lógica de negocio
- **Chart.js**: Visualización de gráficas
- **LocalStorage**: Persistencia de datos

## 📂 Estructura de Archivos

```
Calculadora-eco/
├── index.html      # Estructura HTML de la aplicación
├── styles.css      # Estilos y diseño
├── app.js          # Lógica y funcionalidad
└── README.md       # Este archivo
```

## 🚀 Cómo Usar

1. **Abre `index.html`** en tu navegador web
2. **Agrega aparatos** llenando el formulario:
   - Nombre del aparato (ej: Refrigerador)
   - Potencia en Watts (ej: 1500)
   - Horas de uso por día (ej: 8)
   - Precio por kWh (ej: 2.5)
3. **Visualiza resultados**:
   - Ver aparatos registrados
   - Resumen de consumo total
   - Gráficas de análisis
   - Impacto ambiental
   - Recomendaciones

4. **Manage datos**:
   - Elimina aparatos individuales
   - Limpia todos los datos con el botón "Limpiar Todos los Datos"

## 📊 Ejemplo de Cálculo

**Aparato**: Refrigerador
- **Potencia**: 1500 W
- **Uso diario**: 24 horas
- **Precio por kWh**: $2.50

**Resultados**:
- Consumo diario: (1500 × 24) / 1000 = 36 kWh
- Costo diario: 36 × $2.50 = $90.00
- Costo mensual: $90.00 × 30 = $2,700.00
- Emisiones CO₂: 36 × 0.475 = 17.1 kg CO₂/día
- Equivalencia: 17.1 / 0.21 = 81.4 km conduciendo

## 🌱 Consejos para Reducir Consumo

1. **Apaga los aparatos** cuando no los uses
2. **Evita standby** usando regletas inteligentes
3. **Ajusta configuración**: Termostato, brillo de pantalla
4. **Mantenimiento**: Limpia filtros y mantén equipos en buen estado
5. **Electrodomésticos eficientes**: Busca etiqueta energética A+++

## 📈 Factores de Emisión

Los factores de emisión utilizados están basados en:
- Matriz energética de México (CFE)
- Estudios de EPA (Environmental Protection Agency)
- Datos de IPCC (Intergovernmental Panel on Climate Change)

## 🔒 Privacidad

- Todos los datos se guardan **localmente en tu navegador**
- No se envía información a servidores externos
- Los datos se pueden eliminar en cualquier momento

## 📝 Notas

- La aplicación está optimizada para navegadores modernos (Chrome, Firefox, Edge, Safari)
- Se recomienda usar la versión más actualizada de tu navegador
- Compatible con dispositivos móviles

---

**Versión**: 1.0.0  
**Última actualización**: Diciembre 2024  
**Licencia**: MIT