"use client";

import { useState, useEffect } from "react";
import { DataView } from "primereact/dataview";
import { Button } from "primereact/button";
import { useRouter } from "next/router";     // ← CORRECTO EN NEXT
import { obtenerUsuarios } from "../services/usuarioService";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
 
export default function ListaUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const router = useRouter();

  useEffect(() => {
    obtenerUsuarios().then((data) => setUsuarios(data));
  }, []);

  const itemTemplate = (usuario) => {
    return (
      <div
          // ← AQUÍ EL CAMBIO
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "20px",
          marginBottom: "20px",
          borderRadius: "14px",
          background: "#ffffff",
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          cursor: "pointer",
          transition: "all .15s ease"
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.transform = "scale(1.02)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.transform = "scale(1)")
        }
      >
        <div style={{ display: "flex", gap: "15px" }}>
          <img
            src={`https://picsum.photos/seed/${usuario.id}/120`}
            alt="foto"
            style={{
              width: "110px",
              height: "110px",
              borderRadius: "10px",
              objectFit: "cover"
            }}
          />

          <div>
            <h3 style={{ margin: 0 }}>{usuario.name}</h3>

            <p style={{ margin: "6px 0" }}>
              <i className="pi pi-envelope" /> {usuario.email}
            </p>

            <p style={{ margin: "6px 0" }}>
              <i className="pi pi-map-marker" /> {usuario.address.city}
            </p>
          </div>
        </div>

        <div>
          <Button icon="pi pi-info-circle" severity="info" 
          onClick={() => router.push(`/usuario/${usuario.id}`)} />
        </div>
      </div>
    );
  };

  return (
    <div style={{ maxWidth: "900px", margin: "30px auto" }}>
      <h2 style={{ marginBottom: "20px" }}>Lista de Usuarios</h2>

      <DataView 
        value={usuarios}
        layout="list"
        itemTemplate={itemTemplate}
         paginator rows={5} 
      />
    </div>
  );
}
