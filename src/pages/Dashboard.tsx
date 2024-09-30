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
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAuth } from "@/context/AuthContext";
import { useAllCategories } from "@/hooks/useQueryCategory";
import { useAllUsers } from "@/hooks/useQueryUsers";
import {
  Alert01Icon,
  CheckmarkCircle01Icon,
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
export const Dashboard = () => {
  // CONSULTA DE TODOS LOS USUARIOS
  const { data, isLoading } = useAllUsers(fields);
  const { data: categories, isLoading: categoriesLoading } =
    useAllCategories(fieldsCategories);
  const { role } = useAuth();

  console.log(categories);

  // DATA OARA GRAFIO DE BARRAS PRODUCTOS POR CATEGORIA
  const barCategoriesData = categories?.map((category) => ({
    name: category.name,
    cantidad: category?.product?.length,
  }));

  // DATA PARA EL GRAFIO DE CANTIDAD DE PRODUCTOD POR CATEGORIA
  // Transformar los datos
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

  const inventoryStatus = [
    { name: "In Stock", value: 3500, color: "#4CAF50" },
    { name: "Low Stock", value: 1200, color: "#FFC107" },
    { name: "Out of Stock", value: 400, color: "#F44336" },
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
              <div className="text-2xl font-bold">{data?.count}</div>
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
                {data?.users.filter((user) => user.status === true).length}
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
                {data?.users.filter((user) => user.status === false).length}
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

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {categoriesLoading ? (
          <CardSkeleton />
        ) : (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Categorias
              </CardTitle>
              {/* {isLoading && <Skeleton className="h-5 w-[100px]" />} */}
              <UserSearch01Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{categories?.length}</div>
              <p className="text-xs text-muted-foreground">
                {/* +10% desde el último mes */}
              </p>
            </CardContent>
          </Card>
        )}
        {categoriesLoading ? (
          <CardSkeleton />
        ) : (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Categorias en uso
              </CardTitle>
              {/* {isLoading && <Skeleton className="h-5 w-[100px]" />} */}
              <UserSearch01Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {categories?.filter((item) => item.status === true).length}
              </div>
              <p className="text-xs text-muted-foreground">
                {/* +10% desde el último mes */}
              </p>
            </CardContent>
          </Card>
        )}
        {categoriesLoading ? (
          <CardSkeleton />
        ) : (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Categorias en desuso
              </CardTitle>
              {/* {isLoading && <Skeleton className="h-5 w-[100px]" />} */}
              <UserSearch01Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {categories?.filter((item) => item.status === false).length}
              </div>
              <p className="text-xs text-muted-foreground">
                {/* +10% desde el último mes */}
              </p>
            </CardContent>
          </Card>
        )}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-4 pb-2">
            <CardTitle className="text-sm font-medium">
              No se que poner aqui
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p>Algna data que pondremo</p>
          </CardContent>
        </Card>
        {/* Más tarjetas o contenido específico para EncargadoAlmacen */}
      </div>
      {/* <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-4 pb-2">
            <h2>Almacen Data 2</h2>
          </CardHeader>
          <CardContent className="space-y-2">
            <p>Some more almacen-specific data</p>
          </CardContent>
        </Card>
      </div> */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Cantidad de Productos por categoria</CardTitle>
            {/* <CardDescription>Top 4 productos más vendidos</CardDescription> */}
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
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
        {/* <Card>
          <CardHeader>
            <CardTitle>Cantidad de Productos disponibles</CardTitle>
            <CardDescription>
              Segmentación de clientes por grupo
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  data={pieCategoriesData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={150}
                  fill="#8884d8"
                  // label
                >
                  {pieCategoriesData?.map((entry, index) => (
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
        </Card> */}
        {/* <Card className="col-span-2">
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
        </Card> */}
      </div>
      {/* <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Cantidad de Productos disponibles</CardTitle>
            <CardDescription>
              Segmentación de productos por cantidad disponible
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[600px]">
            <ResponsiveContainer width="100%" height={600}>
              <BarChart
                data={barProductsData}
                layout="vertical"
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" tick={{ fontSize: 12 }} tickMargin={10} />
                <YAxis
                  type="category"
                  dataKey="name"
                  width={150}
                  tick={{ fontSize: 12 }}
                  tickMargin={10}
                />
                <Tooltip />
                <Bar dataKey="quantity" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div> */}

      {/* <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1">
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
      </div> */}
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">System Inventory Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Total Inventory Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <PackageIcon className="h-12 w-12 text-primary" />
                <span className="text-4xl font-bold">
                  {totalItems.toLocaleString()}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Inventory by Category</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={inventoryData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#8884d8" />
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
                    {inventoryStatus.map((entry, index) => (
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
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>In Stock</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {detailedInventory.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.category}</TableCell>
                      <TableCell>{item.inStock}</TableCell>
                      <TableCell>${item.price.toFixed(2)}</TableCell>
                      <TableCell>
                        {item.inStock > 50 ? (
                          <Badge variant="default">
                            <CheckmarkCircle01Icon className="w-4 h-4 mr-1" />
                            In Stock
                          </Badge>
                        ) : item.inStock > 10 ? (
                          <Badge variant="destructive">
                            <Alert01Icon className="w-4 h-4 mr-1" />
                            Low Stock
                          </Badge>
                        ) : (
                          <Badge variant="destructive">
                            <Alert01Icon className="w-4 h-4 mr-1" />
                            Out of Stock
                          </Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
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
