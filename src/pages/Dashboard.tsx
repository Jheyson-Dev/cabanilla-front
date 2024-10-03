import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAuth } from "@/context/AuthContext";
import { useAllCategories } from "@/hooks/useQueryCategory";
import { useAllProducts } from "@/hooks/useQueryProduct";
import { useAllUsers } from "@/hooks/useQueryUsers";
import {
  Dollar01Icon,
  PackageIcon,
  ShoppingCart01Icon,
  TreatmentIcon,
  UserSearch01Icon,
} from "hugeicons-react";
import { FC } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useAllKardex } from "@/hooks/useQueryKardex";
import { DateFormated } from "@/components/shared/DateFormated";
import { Movements } from "@/components/shared/Movements";

const lineChartData = [
  { name: "Ene", ventas: 4000 },
  { name: "Feb", ventas: 3000 },
  { name: "Mar", ventas: 5000 },
  { name: "Abr", ventas: 4500 },
  { name: "May", ventas: 6000 },
  { name: "Jun", ventas: 5500 },
];

const barChartData = [
  { name: "Producto A", ventas: 4000 },
  { name: "Producto B", ventas: 3000 },
  { name: "Producto C", ventas: 5000 },
  { name: "Producto D", ventas: 4500 },
];

const pieChartData = [
  { name: "Grupo A", value: 400 },
  { name: "Grupo B", value: 300 },
  { name: "Grupo C", value: 300 },
  { name: "Grupo D", value: 200 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const fields: string[] = ["users { status }", "count"];
const fieldsCategories: string[] = [
  "name",
  "status",
  "product { name quantityAvailable }",
];
const fieldsKardex = [
  "id",
  "productId",
  "originStoreId",
  "destinationStoreId",
  "quantity",
  "movementType",
  "movementDate",
  "product { name }",
  "originStore { nombre }",
  "destinationStore { nombre }",
];
const fieldsProducts = ["id", "name", "quantityAvailable", "status"];
export const Dashboard = () => {
  // CONSULTA DE TODOS LOS USUARIOS
  const { data: users, isLoading } = useAllUsers(fields);
  const { data: categories } = useAllCategories(fieldsCategories);
  const { data: products } = useAllProducts(fieldsProducts);
  const { data: kardex } = useAllKardex(fieldsKardex);

  const { role } = useAuth();

  console.log(products);

  // DATA OARA GRAFIO DE BARRAS PRODUCTOS POR CATEGORIA
  const barCategoriesData = categories?.map((category) => ({
    name: category.name,
    cantidad: category?.product?.length,
  }));

  // DATA PARA EL GRAFIO DE CANTIDAD DE PRODUCTOD POR CATEGORIA
  const barProductsData = categories?.flatMap((category) =>
    category?.product?.map((product) => ({
      name: product.name,
      quantity: product.quantityAvailable,
    }))
  );

  const inventoryData = [
    { category: "Electronics", count: 1200 },
    { category: "Furniture", count: 800 },
    { category: "Clothing", count: 1500 },
    { category: "Books", count: 1000 },
    { category: "Toys", count: 600 },
  ];

  // Agrupar los productos por su estado
  const availableCount =
    products?.filter((product) => product.status).length || 0;
  const unavailableCount = (products?.length ?? 0) - availableCount;

  // Crear el array para el gráfico de pastel
  const inventoryStatus = [
    { name: "Available", value: availableCount, color: "#00C49F" },
    { name: "Unavailable", value: unavailableCount, color: "#FF8042" },
  ];

  const recentActivities = [
    {
      id: 1,
      action: "Item Restocked",
      item: "Laptop",
      quantity: 50,
      date: "2023-09-28",
    },
    {
      id: 2,
      action: "New Item Added",
      item: "Office Chair",
      quantity: 100,
      date: "2023-09-27",
    },
    {
      id: 3,
      action: "Item Sold",
      item: "T-shirt",
      quantity: 25,
      date: "2023-09-26",
    },
    {
      id: 4,
      action: "Item Returned",
      item: "Headphones",
      quantity: 5,
      date: "2023-09-25",
    },
  ];

  const detailedInventory = [
    {
      id: 1,
      name: "Laptop",
      category: "Electronics",
      inStock: 120,
      price: 999.99,
    },
    {
      id: 2,
      name: "Office Chair",
      category: "Furniture",
      inStock: 50,
      price: 199.99,
    },
    {
      id: 3,
      name: "T-shirt",
      category: "Clothing",
      inStock: 200,
      price: 29.99,
    },
    { id: 4, name: "Novel", category: "Books", inStock: 80, price: 14.99 },
    {
      id: 5,
      name: "Action Figure",
      category: "Toys",
      inStock: 30,
      price: 24.99,
    },
  ];

  const totalItems = inventoryData.reduce((sum, item) => sum + item.count, 0);

  const renderAdminContent = () => (
    <div className="grid gap-4">
      {/* TARJETAS DE INFORMACION DE DATOS */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {isLoading ? (
          <CardSkeleton />
        ) : (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Usuarios
              </CardTitle>
              {/* {isLoading && <Skeleton className="h-5 w-[100px]" />} */}
              <UserSearch01Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{users?.count}</div>
              <p className="text-xs text-muted-foreground">
                {/* +10% desde el último mes */}
              </p>
            </CardContent>
          </Card>
        )}

        {isLoading ? (
          <CardSkeleton />
        ) : (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Activos</CardTitle>
              <Dollar01Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {users?.users.filter((user) => user.status === true).length}
              </div>
              <p className="text-xs text-muted-foreground">
                {/* +20.1% desde el último mes */}
              </p>
            </CardContent>
          </Card>
        )}
        {isLoading ? (
          <CardSkeleton />
        ) : (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Inactivos</CardTitle>
              <ShoppingCart01Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {users?.users.filter((user) => user.status === false).length}
              </div>
              <p className="text-xs text-muted-foreground">
                {/* +5% desde la última semana */}
              </p>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Tasa de Conversión
            </CardTitle>
            <TreatmentIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.2%</div>
            <p className="text-xs text-muted-foreground">
              {/* +2.4% desde el último trimestre */}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Ventas Mensuales</CardTitle>
            <CardDescription>
              Tendencia de ventas en los últimos 6 meses
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="ventas"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Ventas por Producto</CardTitle>
            <CardDescription>Top 4 productos más vendidos</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="ventas" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Distribución de Clientes</CardTitle>
            <CardDescription>
              Segmentación de clientes por grupo
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieChartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Resumen de Métricas</CardTitle>
            <CardDescription>
              Visión general de KPIs importantes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-lg font-semibold">Tasa de Conversión</h3>
                <p className="text-2xl font-bold">3.2%</p>
                <p className="text-sm text-muted-foreground">
                  +0.2% vs mes anterior
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Promedio de Ticket</h3>
                <p className="text-2xl font-bold">$85.20</p>
                <p className="text-sm text-muted-foreground">
                  -2.3% vs mes anterior
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Nuevos Clientes</h3>
                <p className="text-2xl font-bold">+143</p>
                <p className="text-sm text-muted-foreground">
                  +12% vs mes anterior
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold">NPS</h3>
                <p className="text-2xl font-bold">72</p>
                <p className="text-sm text-muted-foreground">
                  +5 puntos vs trimestre anterior
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderEncargadoAlmacenContent = () => (
    <div className="grid gap-4">
      {/* Contenido específico para EncargadoAlmacen */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Inventory Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <PackageIcon className="h-12 w-12 text-primary" />
              <span className="text-4xl font-bold">{products?.length}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Inventory by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={barCategoriesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="cantidad" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Inventory Status</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={inventoryStatus}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {inventoryStatus?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="col-span-1 md:col-span-2 lg:col-span-3">
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Action</TableHead>
                  <TableHead>Item</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentActivities.map((activity) => (
                  <TableRow key={activity.id}>
                    <TableCell>{activity.action}</TableCell>
                    <TableCell>{activity.item}</TableCell>
                    <TableCell>{activity.quantity}</TableCell>
                    <TableCell>{activity.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="col-span-1 md:col-span-2 lg:col-span-3">
          <CardHeader>
            <CardTitle>Detailed Inventory</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableCaption>
                Dashboard de Movimientos de Inventario
              </TableCaption>
              <TableHeader>
                <TableRow>
                  {/* <TableHead className="w-[50px]">ID</TableHead> */}
                  <TableHead>Fecha de Movimiento</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Producto</TableHead>
                  <TableHead className="text-right">Cantidad</TableHead>
                  <TableHead>Origen</TableHead>
                  <TableHead>Destino</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {kardex?.map((movement) => (
                  <TableRow key={movement.id}>
                    {/* <TableCell className="font-medium">{movement.id}</TableCell> */}
                    <TableCell>
                      <DateFormated date={movement.movementDate} />
                    </TableCell>
                    <TableCell>
                      <Movements type={movement.movementType} />
                    </TableCell>
                    <TableCell>{movement.product.name}</TableCell>
                    <TableCell className="text-right">
                      {movement.quantity}
                    </TableCell>
                    <TableCell>
                      {movement.originStore?.nombre || "N/A"}
                    </TableCell>
                    <TableCell>{movement.destinationStore.nombre}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return (
    <div className="grid gap-4 -z-10">
      {isLoading ? (
        <CardSkeleton />
      ) : role === "Admin" ? (
        renderAdminContent()
      ) : role === "EncargadoAlmacen" ? (
        renderEncargadoAlmacenContent()
      ) : (
        <div>No tienes acceso a este contenido.</div>
      )}
    </div>
  );
};

export const CardSkeleton: FC = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-4 pb-2">
        <Skeleton className="h-5 w-full" />
      </CardHeader>
      <CardContent className="space-y-2">
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-4 w-full " />
      </CardContent>
    </Card>
  );
};
