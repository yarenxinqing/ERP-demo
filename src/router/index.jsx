import React from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
  
import Dashboard from '../pages/Dashboard';
import PurchaseOrderList from '../pages/purchase/PurchaseOrderList';
import PurchasePlan from '../pages/purchase/PurchasePlan';
import InventoryManagement from '../pages/purchase/InventoryManagement';
import PurchaseSettlement from '../pages/purchase/PurchaseSettlement';
import SalesOrderList from '../pages/sales/SalesOrderList';
import CustomerManagement from '../pages/sales/CustomerManagement';
import SalesQuote from '../pages/sales/SalesQuote';
import ShipmentManagement from '../pages/sales/ShipmentManagement';
import SalesSettlement from '../pages/sales/SalesSettlement';
import InventoryList from '../pages/inventory/InventoryList';
import WarehouseSetup from '../pages/inventory/WarehouseSetup';
import InventoryOperations from '../pages/inventory/InventoryOperations';
import InventoryMonitoring from '../pages/inventory/InventoryMonitoring';
import BatchManagement from '../pages/inventory/BatchManagement';
import FinancialManagement from '../pages/finance/FinancialManagement';
import Accounting from '../pages/finance/Accounting';
import Transactions from '../pages/finance/Transactions';
import Budget from '../pages/finance/Budget';
import FinancialStatements from '../pages/finance/FinancialStatements';
import AccountsReceivablePayable from '../pages/finance/AccountsReceivablePayable';
import CostManagement from '../pages/finance/CostManagement';
import HRManagement from '../pages/hr/HRManagement';
import Employees from '../pages/hr/Employees';
import Recruitment from '../pages/hr/Recruitment';
import Attendance from '../pages/hr/Attendance';
import Performance from '../pages/hr/Performance';
import ReportCenter from '../pages/report/ReportCenter';
import ReportList from '../pages/report/ReportList';
import SalesReport from '../pages/report/SalesReport';
import PurchaseReport from '../pages/report/PurchaseReport';
import InventoryReport from '../pages/report/InventoryReport';
import FinancialReport from '../pages/report/FinancialReport';
import SystemSettings from '../pages/settings/SystemSettings';
import BasicSettings from '../pages/settings/BasicSettings';
import UserManagement from '../pages/settings/UserManagement';
import RolePermissions from '../pages/settings/RolePermissions';
import LogManagement from '../pages/settings/LogManagement';
import SystemParameters from '../pages/settings/SystemParameters';
import SupplierManagement from '../pages/purchase/suppliers/SupplierManagement';
import ProductionPlan from '../pages/production/ProductionPlan';
import ProductionTasks from '../pages/production/ProductionTasks';
import ProductionExecution from '../pages/production/ProductionExecution';
import QualityManagement from '../pages/quality/QualityManagement';
import IncomingInspection from '../pages/quality/inspection/IncomingInspection';
import InProcessInspection from '../pages/quality/inspection/InProcessInspection';
import FinalInspection from '../pages/quality/inspection/FinalInspection';
import NonConformingRecords from '../pages/quality/nonconforming/NonConformingRecords';
import NonConformingReview from '../pages/quality/nonconforming/NonConformingReview';
import NonConformingProcess from '../pages/quality/nonconforming/NonConformingProcess';
import BatchTraceability from '../pages/quality/traceability/BatchTraceability';
import MaterialTraceability from '../pages/quality/traceability/MaterialTraceability';
import ProcessTraceability from '../pages/quality/traceability/ProcessTraceability';
import QualityIndicators from '../pages/quality/analysis/QualityIndicators';
import DefectRateStatistics from '../pages/quality/analysis/DefectRateStatistics';
import ImprovementTracking from '../pages/quality/analysis/ImprovementTracking';

import MainLayout from '../pages/layout';
import ErrorPage from '../pages/ErrorPage';


// 路由配置
const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: '', element: <Navigate to="/dashboard" replace /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'purchase/plan', element: <PurchasePlan /> },
      { path: 'purchase/inventory', element: <InventoryManagement /> },
      { path: 'purchase/settlement', element: <PurchaseSettlement /> },
      { path: 'purchase/suppliers', element: <SupplierManagement /> },
      { path: 'purchase', element: <PurchaseOrderList /> },
      { path: 'sales/customers', element: <CustomerManagement /> },
      { path: 'sales/quotes', element: <SalesQuote /> },
      { path: 'sales/orders', element: <SalesOrderList /> },
      { path: 'sales/shipments', element: <ShipmentManagement /> },
      { path: 'sales/settlement', element: <SalesSettlement /> },
      { path: 'inventory/warehouse', element: <WarehouseSetup /> },
      { path: 'inventory/operations', element: <InventoryOperations /> },
      { path: 'inventory/monitoring', element: <InventoryMonitoring /> },
      { path: 'inventory/batch', element: <BatchManagement /> },
      { path: 'inventory', element: <InventoryList /> },
      { path: 'production/planning', element: <ProductionPlan /> },
      { path: 'production/tasks', element: <ProductionTasks /> },
      { path: 'production/execution', element: <ProductionExecution /> },
      { path: 'quality', element: <QualityManagement />,
        children: [
          { path: '', element: <Navigate to="inspection/incominginspection" replace /> },
          { path: 'inspection/incominginspection', element: <IncomingInspection /> },
          { path: 'inspection/inprocessinspection', element: <InProcessInspection /> },
          { path: 'inspection/finallnspection', element: <FinalInspection /> },
          { path: 'nonconforming/nonconformingrecords', element: <NonConformingRecords /> },
          { path: 'nonconforming/nonconformingreview', element: <NonConformingReview /> },
          { path: 'nonconforming/nonconformingprocess', element: <NonConformingProcess /> },
          { path: 'traceability/batchtraceability', element: <BatchTraceability /> },
          { path: 'traceability/materialtraceability', element: <MaterialTraceability /> },
          { path: 'traceability/processtraceability', element: <ProcessTraceability /> },
          { path: 'analysis/QualityIndicators', element: <QualityIndicators /> },
          { path: 'analysis/DefectRateStatistics', element: <DefectRateStatistics /> },
          { path: 'analysis/improvementTracking', element: <ImprovementTracking /> }
        ]
      },
      { path: 'finance', element: <FinancialManagement />,

        children: [
        { path: '', element: <Navigate to="accounting" replace /> },
        { path: 'accounting', element: <Accounting /> },
        { path: 'accounts-receivable-payable', element: <AccountsReceivablePayable /> },
        { path: 'cost-management', element: <CostManagement /> },
        { path: 'transactions', element: <Transactions /> },
        { path: 'budget', element: <Budget /> },
        { path: 'statements', element: <FinancialStatements /> }
      ]
      },
      { path: 'hr', element: <HRManagement />,
        children: [
          { path: '', element: <Navigate to='employees' replace /> },
          { path: 'employees', element: <Employees /> },
          { path: 'recruitment', element: <Recruitment /> },
          { path: 'attendance', element: <Attendance /> },
          { path: 'performance', element: <Performance /> }
        ]
      },
      { path: 'report', element: <ReportCenter />,
        children: [
          { path: '', element: <Navigate to='list' replace /> },
          { path: 'list', element: <ReportList /> },
          { path: 'sales', element: <SalesReport /> },
          { path: 'purchase', element: <PurchaseReport /> },
          { path: 'inventory', element: <InventoryReport /> },
          { path: 'financial', element: <FinancialReport /> }
        ]
      },
      { path: 'settings', element: <SystemSettings />,
        children: [
          { path: '', element: <Navigate to='basic' replace /> },
          { path: 'basic', element: <BasicSettings /> },
          { path: 'users', element: <UserManagement /> },
          { path: 'roles', element: <RolePermissions /> },
          { path: 'logs', element: <LogManagement /> },
          { path: 'params', element: <SystemParameters /> }
        ]
      }
    ]
  }
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;