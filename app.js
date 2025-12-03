// Environmental impact constants
const EMISSION_FACTORS = {
    co2: 0.475, // kg CO2 per kWh (promedio México)
    pm25: 0.08, // mg PM2.5 per kWh
    nox: 0.35, // g NOx per kWh
    so2: 0.15   // g SO2 per kWh
};

const CAR_CO2_PER_KM = 0.21; // kg CO2 per km

// Device-specific recommendations
const DEVICE_RECOMMENDATIONS = {
    refrigerador: {
        keywords: ['refrigerador', 'fridge', 'heladera'],
        recommendations: [
            "❄️ Mantén la puerta cerrada el máximo tiempo posible",
            "🌡️ Ajusta la temperatura a 3-4°C (el congelador a -18°C)",
            "🧊 Descongela regularmente para mejorar la eficiencia",
            "📍 Deja espacio alrededor del refrigerador para circulación de aire",
            "🔄 Limpia las bobinas del condensador cada 3 meses"
        ]
    },
    aire_acondicionado: {
        keywords: ['aire acondicionado', 'aire', 'ac', 'aire condicionado'],
        recommendations: [
            "❄️ Usa en modo eco o ajusta a 24-25°C en verano",
            "🪟 Cierra puertas y ventanas mientras esté encendido",
            "🧹 Limpia o cambia los filtros cada mes",
            "⏰ Apágalo 15 minutos antes de salir de casa",
            "🌙 Usa temporizadores para evitar dejar encendido toda la noche"
        ]
    },
    calefactor: {
        keywords: ['calefactor', 'calefacción', 'estufa', 'heater', 'calentador'],
        recommendations: [
            "🌡️ Mantén la temperatura entre 18-20°C",
            "🪟 Aísla puertas y ventanas para evitar fugas de calor",
            "🧥 Usa ropa abrigada antes de aumentar la temperatura",
            "⏰ Usa temporizadores y apágalo cuando no estés en casa",
            "🚪 Cierra puertas de habitaciones que no uses"
        ]
    },
    television: {
        keywords: ['television', 'tv', 'televisor', 'pantalla'],
        recommendations: [
            "📺 Reduce el brillo y contraste a niveles cómodos",
            "⏰ Apaga completamente cuando no la uses (no dejes en standby)",
            "🔌 Usa una regleta para apagar múltiples dispositivos",
            "⚫ Pantallas OLED consumen menos que LCD",
            "🎵 Baja el volumen para reducir consumo de audio"
        ]
    },
    lavadora: {
        keywords: ['lavadora', 'lavarropas', 'washing machine'],
        recommendations: [
            "💧 Usa agua fría siempre que sea posible",
            "🧺 Llena la lavadora antes de usar (máxima capacidad)",
            "⏰ Usa ciclos cortos para ropa poco sucia",
            "🌙 Lava en horarios de menor tarifa si tu proveedor lo permite",
            "🔧 Mantenimiento regular para mejor eficiencia"
        ]
    },
    secadora: {
        keywords: ['secadora', 'dryer'],
        recommendations: [
            "☀️ Seca ropa al aire libre cuando sea posible",
            "💧 Escurre bien la ropa antes de usar la secadora",
            "🧺 Usa ciclos de baja temperatura",
            "🧹 Limpia el filtro antes de cada uso",
            "👕 Agrupa ropa del mismo tipo para secar"
        ]
    },
    horno: {
        keywords: ['horno', 'oven', 'microondas', 'microwave'],
        recommendations: [
            "🍗 El microondas consume menos que el horno tradicional",
            "🔥 Precalienta solo cuando sea necesario",
            "🚪 Evita abrir la puerta durante la cocción",
            "📦 Cocina múltiples alimentos a la vez",
            "🧊 Descongela en el refrigerador antes de cocinar"
        ]
    },
    bombilla: {
        keywords: ['bombilla', 'luz', 'foco', 'lámpara', 'led'],
        recommendations: [
            "💡 Usa bombillas LED en lugar de incandescentes",
            "🌞 Aprovecha luz natural durante el día",
            "⏰ Apaga luces cuando salgas de una habitación",
            "🔆 Reduce la intensidad si tu bombilla lo permite",
            "♻️ Las LED duran hasta 50,000 horas"
        ]
    },
    computadora: {
        keywords: ['computadora', 'laptop', 'pc', 'ordenador', 'computador'],
        recommendations: [
            "💻 Usa modo ahorro de energía o hibernación",
            "⏰ Apaga la pantalla después de 10 minutos de inactividad",
            "🖥️ Los laptops consumen menos que las computadoras de escritorio",
            "🌡️ Mantén limpio el ventilador para mejor eficiencia",
            "🔌 Desconecta cargadores cuando no estén en uso"
        ]
    },
    monitor: {
        keywords: ['monitor', 'pantalla', 'display'],
        recommendations: [
            "🔆 Reduce brillo y contraste a niveles cómodos",
            "⏰ Activa protector de pantalla o modo reposo",
            "📏 Los monitores LED consumen menos que LCD",
            "🌑 Apaga monitor cuando no lo uses",
            "⚡ Los monitores modernos son más eficientes"
        ]
    }
};

// General recommendations by consumption level
const GENERAL_RECOMMENDATIONS = {
    high: [
        "💡 Tu consumo es muy alto. Considera apagar aparatos no esenciales.",
        "🔌 Usa regletas inteligentes para evitar consumo en standby.",
        "⏰ Programa horarios para usar aparatos de alto consumo.",
        "📊 Monitorea el consumo de cada dispositivo regularmente.",
        "🔄 Considera reemplazar electrodomésticos antiguos por versiones eficientes."
    ],
    medium: [
        "💡 Tu consumo es moderado. Aquí hay consejos para optimizarlo:",
        "🔌 Desconecta los cargadores cuando no estén en uso.",
        "⏰ Usa temporizadores para apagar automáticamente.",
        "🔍 Busca aparatos con etiqueta energética A+++ al comprar",
        "📈 Pequeños cambios pueden ahorrar mucho a largo plazo."
    ],
    low: [
        "✅ ¡Excelente! Tu consumo energético es bajo.",
        "🌱 Continúa con estos buenos hábitos.",
        "📊 Monitorea periódicamente tu consumo para mantenerlo bajo.",
        "💚 Estás contribuyendo al cuidado del medio ambiente.",
        "👥 Comparte tus consejos con familia y amigos."
    ]
};

// Device Storage and Management
let devices = [];
const STORAGE_KEY = 'ecoCalculaDevices';

// Initialize application
document.addEventListener('DOMContentLoaded', () => {
    try {
        loadDevices();
        setupEventListeners();
        updateAllData();
        console.log('Aplicación iniciada correctamente');
    } catch (error) {
        console.error('Error al inicializar la aplicación:', error);
    }
});

// Setup event listeners
function setupEventListeners() {
    try {
        const form = document.getElementById('deviceForm');
        const clearBtn = document.getElementById('clearBtn');
        const exportBtn = document.getElementById('exportBtn');

        if (form) {
            form.addEventListener('submit', handleAddDevice);
        } else {
            console.error('Formulario no encontrado');
        }

        if (clearBtn) {
            clearBtn.addEventListener('click', handleClearAllData);
        } else {
            console.error('Botón de limpiar no encontrado');
        }

        if (exportBtn) {
            exportBtn.addEventListener('click', handleExportToTxt);
        } else {
            console.error('Botón de exportar no encontrado');
        }
    } catch (error) {
        console.error('Error al configurar event listeners:', error);
    }
}

// Add device from form
function handleAddDevice(e) {
    e.preventDefault();

    try {
        const nameInput = document.getElementById('deviceName');
        const wattsInput = document.getElementById('deviceWatts');
        const hoursInput = document.getElementById('hoursPerDay');
        const priceInput = document.getElementById('pricePerKwh');

        const device = {
            id: Date.now(),
            name: nameInput.value.trim(),
            watts: parseFloat(wattsInput.value),
            hoursPerDay: parseFloat(hoursInput.value),
            pricePerKwh: parseFloat(priceInput.value)
        };

        if (device.name && device.watts > 0 && device.hoursPerDay >= 0 && device.pricePerKwh >= 0) {
            devices.push(device);
            saveDevices();
            updateAllData();
            document.getElementById('deviceForm').reset();
            console.log('Dispositivo agregado exitosamente:', device);
        } else {
            alert('Por favor, ingresa valores válidos para todos los campos');
        }
    } catch (error) {
        console.error('Error al agregar dispositivo:', error);
        alert('Error al agregar el dispositivo. Intenta nuevamente.');
    }
}

// Delete device
function deleteDevice(id) {
    devices = devices.filter(d => d.id !== id);
    saveDevices();
    updateAllData();
}

// Save devices to localStorage
function saveDevices() {
    try {
        const dataToSave = JSON.stringify(devices);
        localStorage.setItem(STORAGE_KEY, dataToSave);
        console.log('Datos guardados exitosamente:', devices);
    } catch (error) {
        console.error('Error al guardar datos:', error);
        alert('Error al guardar los datos');
    }
}

// Load devices from localStorage
function loadDevices() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            devices = JSON.parse(stored);
            console.log('Datos cargados desde localStorage:', devices);
        } else {
            devices = [];
            console.log('No hay datos guardados, usando array vacío');
        }
    } catch (error) {
        console.error('Error al cargar datos:', error);
        devices = [];
    }
}

// Clear all data
function handleClearAllData() {
    if (confirm('¿Estás seguro de que deseas eliminar todos los aparatos registrados?')) {
        devices = [];
        saveDevices();
        updateAllData();
    }
}

// Calculate consumption in kWh
function calculateConsumption(watts, hoursPerDay) {
    return (watts * hoursPerDay) / 1000;
}

// Calculate cost
function calculateCost(consumption, pricePerKwh) {
    return consumption * pricePerKwh;
}

// Calculate environmental impact
function calculateEnvironmentalImpact(consumption) {
    return {
        co2: consumption * EMISSION_FACTORS.co2,
        pm25: consumption * EMISSION_FACTORS.pm25,
        nox: consumption * EMISSION_FACTORS.nox,
        so2: consumption * EMISSION_FACTORS.so2
    };
}

// Update all data (devices list, summary, charts, impact)
function updateAllData() {
    updateDevicesList();
    updateSummary();
    updateCharts();
    updateEnvironmentalImpact();
    updateRecommendations();
}

// Update devices list display
function updateDevicesList() {
    const devicesList = document.getElementById('devicesList');

    if (devices.length === 0) {
        devicesList.innerHTML = '<p class="empty-message">No hay aparatos registrados aún</p>';
        return;
    }

    devicesList.innerHTML = devices.map(device => {
        const consumption = calculateConsumption(device.watts, device.hoursPerDay);
        const costDaily = calculateCost(consumption, device.pricePerKwh);
        const costMonthly = costDaily * 30;

        return `
            <div class="device-card">
                <div class="device-info">
                    <div class="device-name">${device.name}</div>
                    <div class="device-details">
                        <div class="device-detail">
                            <strong>Potencia:</strong> ${device.watts} W
                        </div>
                        <div class="device-detail">
                            <strong>Uso diario:</strong> ${device.hoursPerDay} h
                        </div>
                        <div class="device-detail">
                            <strong>Consumo:</strong> ${consumption.toFixed(2)} kWh/día
                        </div>
                        <div class="device-detail">
                            <strong>Costo diario:</strong> $${costDaily.toFixed(2)}
                        </div>
                        <div class="device-detail">
                            <strong>Costo mensual:</strong> $${costMonthly.toFixed(2)}
                        </div>
                    </div>
                </div>
                <div class="device-actions">
                    <button class="btn-delete" onclick="deleteDevice(${device.id})">Eliminar</button>
                </div>
            </div>
        `;
    }).join('');
}

// Update summary cards
function updateSummary() {
    if (devices.length === 0) {
        document.getElementById('totalConsumption').textContent = '0 kWh';
        document.getElementById('totalCostDaily').textContent = '$0.00';
        document.getElementById('totalCostMonthly').textContent = '$0.00';
        document.getElementById('totalCostAnnual').textContent = '$0.00';
        return;
    }

    let totalConsumption = 0;
    let totalCostDaily = 0;

    devices.forEach(device => {
        const consumption = calculateConsumption(device.watts, device.hoursPerDay);
        const costDaily = calculateCost(consumption, device.pricePerKwh);

        totalConsumption += consumption;
        totalCostDaily += costDaily;
    });

    const totalCostMonthly = totalCostDaily * 30;
    const totalCostAnnual = totalCostDaily * 365;

    document.getElementById('totalConsumption').textContent = `${totalConsumption.toFixed(2)} kWh`;
    document.getElementById('totalCostDaily').textContent = `$${totalCostDaily.toFixed(2)}`;
    document.getElementById('totalCostMonthly').textContent = `$${totalCostMonthly.toFixed(2)}`;
    document.getElementById('totalCostAnnual').textContent = `$${totalCostAnnual.toFixed(2)}`;
}

// Update charts
let consumptionChart, costChart, pieChart, projectionChart;

function updateCharts() {
    // Check if chart elements exist before trying to access them
    const chartElement1 = document.getElementById('consumptionChart');
    const chartElement2 = document.getElementById('costChart');
    const chartElement3 = document.getElementById('pieChart');
    const chartElement4 = document.getElementById('projectionChart');

    if (!chartElement1 || !chartElement2 || !chartElement3 || !chartElement4) {
        console.warn('Chart elements not found');
        return;
    }

    const ctx1 = chartElement1.getContext('2d');
    const ctx2 = chartElement2.getContext('2d');
    const ctx3 = chartElement3.getContext('2d');
    const ctx4 = chartElement4.getContext('2d');

    const labels = devices.map(d => d.name);
    const consumptionData = devices.map(d => calculateConsumption(d.watts, d.hoursPerDay));
    const costData = devices.map(d => {
        const consumption = calculateConsumption(d.watts, d.hoursPerDay);
        return calculateCost(consumption, d.pricePerKwh);
    });

    const chartColor = '#4CAF50';
    const chartColorSecondary = '#81C784';

    // Destroy existing charts if they exist
    if (consumptionChart) consumptionChart.destroy();
    if (costChart) costChart.destroy();
    if (pieChart) pieChart.destroy();
    if (projectionChart) projectionChart.destroy();

    // Consumption Bar Chart
    consumptionChart = new Chart(ctx1, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'kWh/día',
                data: consumptionData,
                backgroundColor: chartColor,
                borderColor: chartColor,
                borderWidth: 2,
                borderRadius: 5
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: '#666'
                    }
                },
                x: {
                    ticks: {
                        color: '#666'
                    }
                }
            }
        }
    });

    // Cost Bar Chart
    costChart = new Chart(ctx2, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: '$/día',
                data: costData,
                backgroundColor: chartColorSecondary,
                borderColor: chartColor,
                borderWidth: 2,
                borderRadius: 5
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: '#666'
                    }
                },
                x: {
                    ticks: {
                        color: '#666'
                    }
                }
            }
        }
    });

    // Pie Chart - Consumption Distribution
    pieChart = new Chart(ctx3, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                data: consumptionData,
                backgroundColor: [
                    '#4CAF50',
                    '#81C784',
                    '#66BB6A',
                    '#4CAF50',
                    '#45a049',
                    '#2E7D32',
                    '#558B2F',
                    '#C5E1A5',
                    '#AED581',
                    '#9CCC65'
                ],
                borderColor: '#ffffff',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'right'
                }
            }
        }
    });

    // Projection Chart - Monthly Cost
    const days = ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4'];
    const totalCostDaily = costData.reduce((a, b) => a + b, 0);
    const projectionData = days.map((_, i) => totalCostDaily * 7 * (i + 1));

    projectionChart = new Chart(ctx4, {
        type: 'line',
        data: {
            labels: days,
            datasets: [{
                label: 'Costo Acumulado ($)',
                data: projectionData,
                borderColor: chartColor,
                backgroundColor: 'rgba(76, 175, 80, 0.1)',
                borderWidth: 3,
                tension: 0.4,
                fill: true,
                pointBackgroundColor: chartColor,
                pointRadius: 5,
                pointHoverRadius: 7
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: '#666'
                    }
                },
                x: {
                    ticks: {
                        color: '#666'
                    }
                }
            }
        }
    });
}

// Update environmental impact
function updateEnvironmentalImpact() {
    if (devices.length === 0) {
        document.getElementById('co2Emissions').textContent = '0 kg';
        document.getElementById('co2Equivalent').textContent = '0 km';
        document.getElementById('pm25Emissions').textContent = '0 mg';
        document.getElementById('otherEmissions').textContent = '0 g';
        return;
    }

    let totalConsumption = 0;
    devices.forEach(device => {
        totalConsumption += calculateConsumption(device.watts, device.hoursPerDay);
    });

    const impact = calculateEnvironmentalImpact(totalConsumption);

    // CO2 Emissions
    const co2Daily = impact.co2;
    const co2Equivalent = co2Daily / CAR_CO2_PER_KM;

    // PM2.5
    const pm25Daily = impact.pm25;

    // NOx + SO2
    const otherDaily = impact.nox + impact.so2;

    document.getElementById('co2Emissions').textContent = `${co2Daily.toFixed(2)} kg`;
    document.getElementById('co2Equivalent').textContent = `${co2Equivalent.toFixed(1)} km`;
    document.getElementById('pm25Emissions').textContent = `${pm25Daily.toFixed(2)} mg`;
    document.getElementById('otherEmissions').textContent = `${otherDaily.toFixed(2)} g`;
}

// Update recommendations based on consumption and devices
function updateRecommendations() {
    const recommendationsList = document.getElementById('recommendationsList');

    if (devices.length === 0) {
        recommendationsList.innerHTML = `
            <div class="recommendation-card">
                <h4>📊 Comienza a registrar tus aparatos</h4>
                <p>Agrega tus dispositivos electrónicos para obtener recomendaciones personalizadas.</p>
            </div>
        `;
        return;
    }

    // Calculate total daily cost to determine recommendation level
    let totalCostDaily = 0;
    devices.forEach(device => {
        const consumption = calculateConsumption(device.watts, device.hoursPerDay);
        const cost = calculateCost(consumption, device.pricePerKwh);
        totalCostDaily += cost;
    });

    let level = 'low';
    if (totalCostDaily > 50) {
        level = 'high';
    } else if (totalCostDaily > 20) {
        level = 'medium';
    }

    // Get general recommendations for the level
    const generalRecommendations = GENERAL_RECOMMENDATIONS[level];

    // Get device-specific recommendations
    const deviceSpecificRecommendations = getDeviceSpecificRecommendations();

    // Combine all recommendations
    let allRecommendations = [];
    
    // Add first general recommendation
    allRecommendations.push(generalRecommendations[0]);

    // Add device-specific recommendations
    allRecommendations = allRecommendations.concat(deviceSpecificRecommendations);

    // Add remaining general recommendations
    allRecommendations = allRecommendations.concat(generalRecommendations.slice(1));

    // Limit to 8 recommendations
    allRecommendations = allRecommendations.slice(0, 8);

    recommendationsList.innerHTML = allRecommendations.map((rec, index) => `
        <div class="recommendation-card">
            <p>${rec}</p>
        </div>
    `).join('');
}

// Get device-specific recommendations
function getDeviceSpecificRecommendations() {
    const recommendations = [];
    const deviceNames = devices.map(d => d.name.toLowerCase());

    // Check each registered device and get specific recommendations
    for (const [deviceType, deviceInfo] of Object.entries(DEVICE_RECOMMENDATIONS)) {
        for (const deviceName of deviceNames) {
            for (const keyword of deviceInfo.keywords) {
                if (deviceName.includes(keyword)) {
                    // Get 1-2 recommendations from this device type
                    const deviceRecs = deviceInfo.recommendations;
                    const recCount = Math.min(2, deviceRecs.length);
                    for (let i = 0; i < recCount; i++) {
                        if (!recommendations.includes(deviceRecs[i])) {
                            recommendations.push(deviceRecs[i]);
                        }
                    }
                    break;
                }
            }
            if (recommendations.length >= 3) break;
        }
        if (recommendations.length >= 3) break;
    }

    return recommendations;
}

// Export data as JSON (for future use)
function exportData() {
    const dataStr = JSON.stringify(devices, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'eco-calcula-data.json';
    link.click();
}

// Import data from JSON (for future use)
function importData(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const imported = JSON.parse(e.target.result);
            if (Array.isArray(imported)) {
                devices = imported;
                saveDevices();
                updateAllData();
            }
        } catch (error) {
            alert('Error al importar datos: ' + error.message);
        }
    };
    reader.readAsText(file);
}

// Export data to TXT file
function handleExportToTxt() {
    if (devices.length === 0) {
        alert('No hay datos registrados para exportar');
        return;
    }

    try {
        const txtContent = generateTxtReport();
        downloadTxtFile(txtContent);
        console.log('Archivo exportado exitosamente');
    } catch (error) {
        console.error('Error al exportar:', error);
        alert('Error al exportar los datos');
    }
}

// Generate TXT report
function generateTxtReport() {
    let report = '═══════════════════════════════════════════════════════════\n';
    report += '         ECO - CALCULA: REPORTE DE CONSUMO ENERGÉTICO\n';
    report += '═══════════════════════════════════════════════════════════\n\n';
    report += `Fecha de Generación: ${new Date().toLocaleString('es-ES')}\n\n`;

    // Section 1: Aparatos Registrados
    report += '───────────────────────────────────────────────────────────\n';
    report += 'APARATOS ELECTRÓNICOS REGISTRADOS\n';
    report += '───────────────────────────────────────────────────────────\n\n';

    devices.forEach((device, index) => {
        const consumption = calculateConsumption(device.watts, device.hoursPerDay);
        const costDaily = calculateCost(consumption, device.pricePerKwh);
        const costMonthly = costDaily * 30;
        const costAnnual = costDaily * 365;

        report += `${index + 1}. ${device.name.toUpperCase()}\n`;
        report += `   Potencia: ${device.watts} W\n`;
        report += `   Uso diario: ${device.hoursPerDay} horas\n`;
        report += `   Precio por kWh: $${device.pricePerKwh}\n`;
        report += `   ├─ Consumo diario: ${consumption.toFixed(2)} kWh\n`;
        report += `   ├─ Costo diario: $${costDaily.toFixed(2)}\n`;
        report += `   ├─ Costo mensual: $${costMonthly.toFixed(2)}\n`;
        report += `   └─ Costo anual: $${costAnnual.toFixed(2)}\n\n`;
    });

    // Section 2: Resumen de Consumo Total
    report += '───────────────────────────────────────────────────────────\n';
    report += 'RESUMEN TOTAL DE CONSUMO\n';
    report += '───────────────────────────────────────────────────────────\n\n';

    let totalConsumption = 0;
    let totalCostDaily = 0;

    devices.forEach(device => {
        const consumption = calculateConsumption(device.watts, device.hoursPerDay);
        const costDaily = calculateCost(consumption, device.pricePerKwh);
        totalConsumption += consumption;
        totalCostDaily += costDaily;
    });

    const totalCostMonthly = totalCostDaily * 30;
    const totalCostAnnual = totalCostDaily * 365;

    report += `Consumo Total Diario: ${totalConsumption.toFixed(2)} kWh\n`;
    report += `Costo Total Diario: $${totalCostDaily.toFixed(2)}\n`;
    report += `Costo Total Mensual: $${totalCostMonthly.toFixed(2)}\n`;
    report += `Costo Total Anual: $${totalCostAnnual.toFixed(2)}\n\n`;

    // Section 3: Impacto Ambiental
    report += '───────────────────────────────────────────────────────────\n';
    report += 'IMPACTO AMBIENTAL\n';
    report += '───────────────────────────────────────────────────────────\n\n';

    const impact = calculateEnvironmentalImpact(totalConsumption);
    const co2Equivalent = impact.co2 / CAR_CO2_PER_KM;

    report += `Emisiones de CO₂:\n`;
    report += `   └─ ${impact.co2.toFixed(2)} kg CO₂/día\n`;
    report += `   └─ Equivalente a ${co2Equivalent.toFixed(1)} km conduciendo un auto\n\n`;

    report += `Contaminación por Partículas (PM2.5):\n`;
    report += `   └─ ${impact.pm25.toFixed(2)} mg PM2.5/día\n\n`;

    report += `Óxidos de Nitrógeno (NOx):\n`;
    report += `   └─ ${impact.nox.toFixed(2)} g NOx/día\n\n`;

    report += `Dióxido de Azufre (SO₂):\n`;
    report += `   └─ ${impact.so2.toFixed(2)} g SO₂/día\n\n`;

    report += `Otros Contaminantes (NOx + SO₂):\n`;
    report += `   └─ ${(impact.nox + impact.so2).toFixed(2)} g/día\n\n`;

    // Section 4: Información de Cálculos
    report += '───────────────────────────────────────────────────────────\n';
    report += 'INFORMACIÓN DE CÁLCULOS\n';
    report += '───────────────────────────────────────────────────────────\n\n';

    report += `Fórmula de Consumo:\n`;
    report += `   Consumo (kWh) = (Watts × Horas diarias) / 1000\n\n`;

    report += `Fórmula de Costo:\n`;
    report += `   Costo = Consumo (kWh) × Precio por kWh\n\n`;

    report += `Factores de Emisión (México):\n`;
    report += `   ├─ CO₂: ${EMISSION_FACTORS.co2} kg/kWh\n`;
    report += `   ├─ PM2.5: ${EMISSION_FACTORS.pm25} mg/kWh\n`;
    report += `   ├─ NOx: ${EMISSION_FACTORS.nox} g/kWh\n`;
    report += `   └─ SO₂: ${EMISSION_FACTORS.so2} g/kWh\n\n`;

    report += `Equivalencia de CO₂:\n`;
    report += `   └─ ${CAR_CO2_PER_KM} kg CO₂/km (conduciendo un auto)\n\n`;

    // Footer
    report += '═══════════════════════════════════════════════════════════\n';
    report += 'Eco - Calcula © 2024\n';
    report += 'Aplicación para calcular consumo energético e impacto ambiental\n';
    report += '═══════════════════════════════════════════════════════════\n';

    return report;
}

// Download TXT file
function downloadTxtFile(content) {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    const now = new Date();
    const timestamp = now.toISOString().slice(0, 10);
    const filename = `Eco-Calcula-Reporte-${timestamp}.txt`;

    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
