import React from 'react';
import { Layout } from 'antd';
import './HeaderComponent.css'; // Asegúrate de crear este archivo CSS

const { Header } = Layout;
const urlLogoFlexxus = "https://s3-alpha-sig.figma.com/img/6b8b/6193/8cda741ef446c5206a1bdca3b4e7acad?Expires=1723420800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=O8vYjxSkCajkAzIG7Qqk01j-u9eMiSDgMx0JujwZ3TncxFDCj1h6O5NEFov8Xb7ZW32xl5RjDdqG-gKeExZY2IgO1vUmjjD2-j4qMAXcRJRXbZ00eDAPbDfJyso5Cb-jK3Xex-fL~tINDm0EXdnmV32AJy75GngT6lY1sAC973Mn4soYHNd9PG3L1yAf5NBYPet-bcs-2a-lvG6QzqMrKznbQCvvycgFbgvIWIFenYQ7tWo5siAi~mb1UlqY~fncX7pZv1vWUQLKd4lyYm~yNKpDvLPIbp1YrY9vHegiRFubbTyuJQRhuUZ4zzJUitTjxRyh2om4EUe5AiXMaLCjXQ__"
export default function HeaderComponent  () {
  return (
    <Layout>
      <Header className="header">
        <div className="logo">
          <img src={urlLogoFlexxus} alt="Logo" />
        </div>
      </Header>
    </Layout>
  );
}


