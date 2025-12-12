import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { obtenerUsuarioPorId } from "../../services/usuarioService";
import { Button } from "primereact/button";

export default function DetalleUsuario() {
  const router = useRouter();
  const { id } = router.query;
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    if (id) {
      obtenerUsuarioPorId(id).then((data) => setUsuario(data));
    }
  }, [id]);

  if (!usuario) return <p>Cargando...</p>;

  return (
    <div style={{ maxWidth: "700px", margin: "40px auto" }}>
      <Button
        label="Regresar"
        icon="pi pi-arrow-left"
        onClick={() => router.push("/")}
        severity="secondary"
        style={{ marginBottom: "20px" }}
      />

      <div
        style={{
          padding: "25px",
          borderRadius: "14px",
          background: "#ffffff",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        }}
      >
        <h2>{usuario.name}</h2>

        <p><b>Email:</b> {usuario.email}</p>
        <p><b>Teléfono:</b> {usuario.phone}</p>
        <p><b>Sitio web:</b> {usuario.website}</p>

        <h3 style={{ marginTop: "20px" }}>Dirección</h3>
        <p>{usuario.address.street}, {usuario.address.city}</p>

        <h3 style={{ marginTop: "20px" }}>Empresa</h3>
        <p><b>Nombre:</b> {usuario.company.name}</p>
        <p><b>Lema:</b> {usuario.company.catchPhrase}</p>
      </div>
    </div>
  );
}
