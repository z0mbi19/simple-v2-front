import {
  Button,
  Column,
  DataTable,
  Dialog,
  Toast,
  Toolbar,
  Tooltip,
} from "primereact";
import React, { useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";
import { AuthContext } from "../context/login";

const TableCrud = ({ data, cols, getData, url }) => {
  const [product, setProduct] = useState();
  const [deleteProductDialog, setDeleteProductDialog] = useState(false);
  const { handleLogout } = useContext(AuthContext);

  const dt = useRef(null);
  const toast = useRef(null);

  const navigate = useNavigate();

  const actionBodyTemplate = (rowData) => {
    return (
      <>
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-warning mr-2"
          onClick={() => editProduct(rowData)}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-danger"
          onClick={() => confirmDeleteProduct(rowData)}
        />
      </>
    );
  };

  const editProduct = (product) => {
    navigate(`/${url}/update/${product.id}`);
  };

  const confirmDeleteProduct = (product) => {
    setProduct(product);
    setDeleteProductDialog(true);
  };

  const exportColumns = cols.map((col) => ({
    title: col.header,
    dataKey: col.field,
  }));

  const exportCSV = (selectionOnly) => {
    dt.current.exportCSV({ selectionOnly });
  };

  const exportPdf = () => {
    import("jspdf").then((jsPDF) => {
      import("jspdf-autotable").then(() => {
        const doc = new jsPDF.default(0, 0);
        doc.autoTable(exportColumns, data);
        doc.save(`${url}.pdf`);
      });
    });
  };

  const exportExcel = () => {
    import("xlsx").then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(data);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
      const excelBuffer = xlsx.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });
      saveAsExcelFile(excelBuffer, url);
    });
  };

  const saveAsExcelFile = (buffer, fileName) => {
    import("file-saver").then((module) => {
      if (module && module.default) {
        let EXCEL_TYPE =
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
        let EXCEL_EXTENSION = ".xlsx";
        const data = new Blob([buffer], {
          type: EXCEL_TYPE,
        });

        module.default.saveAs(
          data,
          fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION
        );
      }
    });
  };

  const rightToolbarTemplate = () => {
    return (
      <React.Fragment>
        <Button
          type="button"
          icon="pi pi-file"
          onClick={() => exportCSV(false)}
          className="mr-2"
          data-pr-tooltip="CSV"
        />
        <Button
          type="button"
          icon="pi pi-file-excel"
          onClick={exportExcel}
          className="p-button-success mr-2"
          data-pr-tooltip="XLS"
        />
        <Button
          type="button"
          icon="pi pi-file-pdf"
          onClick={exportPdf}
          className="p-button-warning mr-2"
          data-pr-tooltip="PDF"
        />
      </React.Fragment>
    );
  };

  const leftToolbarTemplate = () => {
    return (
      <>
        <Link to={`/${url}/create`}>
          <Button
            label="Novo"
            icon="pi pi-plus"
            className="p-button-success mr-2"
          />
        </Link>
        <Link to="/dashboard">
          <Button className="ml-3" label="Voltar" />
        </Link>
      </>
    );
  };

  const hideDeleteProductDialog = () => {
    setDeleteProductDialog(false);
  };

  const deleteProduct = () => {
    api
      .delete(`${url}/${product.id}`)
      .then(() => {
        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "Serviço deletado",
          life: 3000,
        });
        hideDeleteProductDialog();
        getData();
      })
      .catch((e) => {
        if (e.response.data === "Unauthorized") {
          handleLogout();
        }
      });
  };

  const deleteProductDialogFooter = (
    <React.Fragment>
      <Button
        label="Não"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDeleteProductDialog}
      />
      <Button
        label="Sim"
        icon="pi pi-check"
        className="p-button-text"
        onClick={deleteProduct}
      />
    </React.Fragment>
  );

  return (
    <>
      <Tooltip target=".export-buttons>button" position="bottom" />

      <Toast ref={toast} />

      <Toolbar
        className="md-4"
        left={leftToolbarTemplate}
        right={rightToolbarTemplate}
      ></Toolbar>

      <div className="card">
        <DataTable
          responsiveLayout="scroll"
          value={data}
          scrollable
          ref={dt}
          dataKey="id"
          selectionMode="single"
        >
          {cols.map((col, index) => (
            <Column
              key={index}
              field={col.field}
              sortable
              body={col.body}
              header={col.header}
            />
          ))}
          <Column
            body={actionBodyTemplate}
            exportable={false}
            style={{ minWidth: "8rem" }}
          />
        </DataTable>
      </div>

      <Dialog
        visible={deleteProductDialog}
        style={{ width: "450px" }}
        header="Confirm"
        modal
        footer={deleteProductDialogFooter}
        onHide={hideDeleteProductDialog}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: "2rem" }}
          />
          {product && (
            <span>
              Você tem certeza que quer deletar: <b>{product.nome}</b>?
            </span>
          )}
        </div>
      </Dialog>
    </>
  );
};

export default TableCrud;
