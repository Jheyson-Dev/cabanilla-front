import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { useProductById } from "@/hooks/useQueryProduct";
import { useParams } from "react-router-dom";

const fieldsProduct = [
  "id name description price quantityAvailable status supplierId stores { cantidad store { nombre } }",
];

export const ProductEdit = () => {
  const { id } = useParams();
  const { data } = useProductById(Number(id), fieldsProduct);
  console.log(data);
  return (
    <div>
      {data && (
        <Card>
          <CardHeader>
            <CardTitle>{data.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              <strong>Description:</strong> {data.description}
            </CardDescription>
            <CardDescription>
              <strong>Price:</strong> ${data.price}
            </CardDescription>
            <CardDescription>
              <strong>Quantity Available:</strong> {data.quantityAvailable}
            </CardDescription>
            <CardDescription>
              <strong>Status:</strong>{" "}
              {data.status ? "Available" : "Unavailable"}
            </CardDescription>
            <CardDescription>
              <strong>Supplier ID:</strong> {data.supplierId}
            </CardDescription>
            <CardTitle style={{ marginTop: "20px" }}>Stores</CardTitle>
            {/* <Separator /> */}
            {data.stores?.map((storeItem, index) => (
              <div key={index} style={{ marginBottom: "10px" }}>
                <CardDescription>
                  <strong>Store Name:</strong> {storeItem.store.nombre}
                </CardDescription>
                <CardDescription>
                  <strong>Quantity:</strong> {storeItem.cantidad}
                </CardDescription>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
};
