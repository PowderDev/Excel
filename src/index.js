/* eslint-disable max-len */
import './styles/index.scss'

import { Router } from "@core/routing/Router";
import { DashboardPage } from "./page/DashboardPage";
import { ExcelPage } from './page/ExcelPage';

new Router('#app', {
    dashboard: DashboardPage,
    excel: ExcelPage
})