import PageLayout from "../../layouts/PageLayout";
import React, { useState } from "react";
import { Card } from "react-bootstrap";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

// Datos de ventas por mes, semana y día
const ventasMensuales = [
  { name: "Enero", ventas: 12000 },
  { name: "Febrero", ventas: 15000 },
  { name: "Marzo", ventas: 18000 },
];

const ventasSemanales = [
  { name: "Semana 1", ventas: 3000 },
  { name: "Semana 2", ventas: 3500 },
  { name: "Semana 3", ventas: 4000 },
];

const ventasDiarias = [
  { name: "Lunes", ventas: 1000 },
  { name: "Martes", ventas: 1500 },
  { name: "Miércoles", ventas: 2000 },
];

// Productos agrupados por categorías
const productos = {
  pizzas: [
    { name: "Pizza Margherita", ventas: 500 },
    { name: "Pizza Pepperoni", ventas: 450 },
    { name: "Pizza Vegetariana", ventas: 300 },
    { name: "Pizza Hawaiana", ventas: 250 },
    { name: "Pizza Cuatro Quesos", ventas: 200 },
    { name: "Pizza Napolitana", ventas: 150 },
    { name: "Pizza Barbacoa", ventas: 100 },
    { name: "Pizza Carbonara", ventas: 50 },
    { name: "Pizza Marinara", ventas: 25 },
    { name: "Pizza Capricciosa", ventas: 10 },
    { name: "Pizza Siciliana", ventas: 5 },
    { name: "Pizza Calzone", ventas: 2 },
    { name: "Pizza Romana", ventas: 1 },
    { name: "Pizza Fugazzeta", ventas: 1 },
  ],
  sandwiches: [
    { name: "Sandwich de Pollo", ventas: 200 },
    { name: "Sandwich Vegetariano", ventas: 150 },
  ],
  entradas: [
    { name: "Bruschetta", ventas: 120 },
    { name: "Ensalada Caprese", ventas: 100 },
  ],
  postres: [
    { name: "Tiramisu", ventas: 180 },
    { name: "Gelato", ventas: 150 },
  ],
  bebidas: [
    { name: "Coca-Cola", ventas: 300 },
    { name: "Agua Mineral", ventas: 250 },
    { name: "Cerveza", ventas: 200 },
  ],
};

// Calcular las ventas totales por cada categoría
const categorias = [
  { name: "Pizzas", value: productos.pizzas.reduce((sum, p) => sum + p.ventas, 0) },
  { name: "Sándwiches", value: productos.sandwiches.reduce((sum, p) => sum + p.ventas, 0) },
  { name: "Entradas", value: productos.entradas.reduce((sum, p) => sum + p.ventas, 0) },
  { name: "Postres", value: productos.postres.reduce((sum, p) => sum + p.ventas, 0) },
  { name: "Bebidas", value: productos.bebidas.reduce((sum, p) => sum + p.ventas, 0) },
];

const colores = ["#FF6347", "#32CD32", "#FFD700", "#87CEEB", "#FF8C00"];

// Tipos para las categorías y productos
type Categoria = 'pizzas' | 'sandwiches' | 'entradas' | 'postres' | 'bebidas';
type Producto = { name: string; ventas: number };

const Dashboard: React.FC = (): JSX.Element => {
  const [periodo, setPeriodo] = useState<string>("mes");
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<Categoria | null>(null);

  // Dependiendo del periodo, se seleccionan las ventas (comandas)
  const data = periodo === "mes" ? ventasMensuales : periodo === "semana" ? ventasSemanales : ventasDiarias;

  // Obtener los productos de la categoría seleccionada
  const productosCategoria: Producto[] = categoriaSeleccionada ? productos[categoriaSeleccionada] : [];

  const manejarClicCategoria = (data: any) => {
    const categoria: Categoria = data.name.toLowerCase() as Categoria; // Convertir el nombre en el tipo correcto
    setCategoriaSeleccionada(categoria);
  };

  return (
    <PageLayout label="Dashboard">
      {/* Gráfico de Ventas por Período (Barras) y Distribución de Categorías (Torta) lado a lado */}
      <Card className="p-3 m-2 shadow">
        <h3>Ventas Totales por {periodo}</h3>
        <div>
          <button onClick={() => setPeriodo("mes")}>Mensual</button>
          <button onClick={() => setPeriodo("semana")}>Semanal</button>
          <button onClick={() => setPeriodo("dia")}>Diario</button>
        </div>

        <div style={{ overflowX: "auto", whiteSpace: "nowrap" }}>
          <BarChart width={600} height={300} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="ventas" fill="#8884d8" />
          </BarChart>
        </div>
      </Card>
      <Card className="p-3 m-2 shadow">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          {/* Gráfico de torta (Distribución por categorías) */}
          <div style={{ flex: 1, marginRight: "20px" }}>
            <h3>Distribución de Ventas por Categoría</h3>
            <PieChart width={400} height={400}>
              <Pie
                data={categorias}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label
                onClick={manejarClicCategoria}
              >
                {categorias.map((_entry, index) => (
                  <Cell key={`cell-${index}`} fill={colores[index % colores.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </div>

          {/* Gráfico de barras (Productos más vendidos) */}
          <div style={{ flex: 1, maxWidth: "100%", overflowX: "auto", marginTop: "20px" }}>
            {categoriaSeleccionada ? (
              <>
                <h3>Productos más Vendidos en {categoriaSeleccionada}</h3>
                {productosCategoria.length > 0 ? (
                  <div style={{ width: "100%", overflowX: "auto" }}>
                    <BarChart width={600} height={300} data={productosCategoria}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" tick={false} />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="ventas" fill="#8884d8" />
                    </BarChart>
                  </div>
                ) : (
                  <h4>No hay productos disponibles para esta categoría.</h4>
                )}
              </>
            ) : (
              <h3>Selecciona una categoría de la torta para ver los productos más vendidos.</h3>
            )}
          </div>
        </div>
      </Card>
    </PageLayout>
  );
};

export default Dashboard;
