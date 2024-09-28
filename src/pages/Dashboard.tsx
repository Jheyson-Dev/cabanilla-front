import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useAllUsers } from "@/hooks/user/useQueryUsers";
import {
  Dollar01Icon,
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
export const Dashboard = () => {
  // CONSULTA DE TODOS LOS USUARIOS
  const { data, isLoading } = useAllUsers(fields);
  console.log(data);

  return (
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
