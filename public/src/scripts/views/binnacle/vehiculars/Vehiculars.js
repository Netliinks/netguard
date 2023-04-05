//
//  AssistControl.ts
//
//  Generated by Poll Castillo on 15/03/2023.
//
import { Config } from "../../../Configs.js";
import { getEntityData, getEntitiesData, getUserInfo } from "../../../endpoints.js";
import { CloseDialog, drawTagsIntoTables, renderRightSidebar, filterDataByHeaderType } from "../../../tools.js";
import { UIContentLayout, UIRightSidebar } from "./Layout.js";
import { UITableSkeletonTemplate } from "./Template.js";
// Local configs
const tableRows = Config.tableRows;
let currentPage = Config.currentPage;
const pageName = 'Ingreso Vehicular';
const currentUserData = async() => {
    const currentUser = await getUserInfo();
    const user = await getEntityData('User', `${currentUser.attributes.id}`);
    return user;
}
 
const GetVehiculars = async () => {
    const currentUser = await currentUserData(); //usuario logueado
    const vehicular = await getEntitiesData('Vehicular');
    const FCustomer = vehicular.filter(async (data) => {
        const userVehicular = await getEntityData('User', `${data.ingressIssued.id}`); //Usuario vehicular
        userVehicular.customer.id === `${currentUser.customer.id}`
    });
    return FCustomer;
};
export class Vehiculars {
    constructor() {
        this.dialogContainer = document.getElementById('app-dialogs');
        this.siebarDialogContainer = document.getElementById('entity-editor-container');
        this.appContainer = document.getElementById('datatable-container');
        this.render = async () => {
            let assistControlArray = await GetVehiculars();
            this.appContainer.innerHTML = '';
            this.appContainer.innerHTML = UIContentLayout;
            // Getting interface elements
            const viewTitle = document.getElementById('view-title');
            const tableBody = document.getElementById('datatable-body');
            // Changing interface element content
            viewTitle.innerText = pageName;
            tableBody.innerHTML = UITableSkeletonTemplate.repeat(tableRows);
            // Exec functions
            this.load(tableBody, currentPage, assistControlArray);
            this.searchVisit(tableBody, assistControlArray);
            new filterDataByHeaderType().filter();
            this.pagination(assistControlArray, tableRows, currentPage);
            // Rendering icons
        };
        this.load = (tableBody, currentPage, assistControl) => {
            tableBody.innerHTML = ''; // clean table
            // configuring max table row size
            currentPage--;
            let start = tableRows * currentPage;
            let end = start + tableRows;
            let paginatedItems = assistControl.slice(start, end);
            // Show message if page is empty
            if (assistControl.length === 0) {
                let row = document.createElement('TR');
                row.innerHTML = `
            <td>No existen datos<td>
            <td></td>
            <td></td>
            `;
                tableBody.appendChild(row);
            }
            else {
                for (let i = 0; i < paginatedItems.length; i++) {
                    let vehicular = paginatedItems[i]; // getting visit items
                    let row = document.createElement('TR');
                    row.innerHTML += `
                    <td style="white-space: nowrap">${vehicular.licensePlate}</td>
                    <td>${vehicular.dni}</td>
                    <td>${vehicular.driver}</td>
                    <td id="table-date">${vehicular.ingressDate} ${vehicular.ingressTime}</td>
                    <td id="table-date">${vehicular.egressDate} ${vehicular.egressTime}</td>
                    <td class="tag"><span>${vehicular.visitState.name}</span></td>

                    <td>
                        <button class="button" id="entity-details" data-entityId="${vehicular.id}">
                            <i class="table_icon fa-regular fa-magnifying-glass"></i>
                        </button>
                    </td>
                `;
                    tableBody.appendChild(row);
                    drawTagsIntoTables();
                }
                this.previewAssist();
                this.fixCreatedDate();
            }
        };
        this.pagination = async (items, limitRows, currentPage) => {
            const tableBody = document.getElementById('datatable-body');
            const paginationWrapper = document.getElementById('pagination-container');
            paginationWrapper.innerHTML = '';
            let pageCount;
            pageCount = Math.ceil(items.length / limitRows);
            let button;
            for (let i = 1; i < pageCount + 1; i++) {
                button = setupButtons(i, items, currentPage, tableBody, limitRows);
                paginationWrapper.appendChild(button);
            }
            function setupButtons(page, items, currentPage, tableBody, limitRows) {
                const button = document.createElement('button');
                button.classList.add('pagination_button');
                button.innerText = page;
                button.addEventListener('click', () => {
                    currentPage = page;
                    new Vehiculars().load(tableBody, page, items);
                });
                return button;
            }
        }
        this.searchVisit = async (tableBody, visits) => {
            const search = document.getElementById('search');
            await search.addEventListener('keyup', () => {
                const arrayVisits = visits.filter((vehicular) => `${vehicular.licensePlate}${vehicular.dni}${vehicular.driver}${vehicular.ingressDate}${vehicular.ingressTime}${vehicular.egressDate}${vehicular.egressTime}${vehicular.visitState.name}`
                    .toLowerCase()
                    .includes(search.value.toLowerCase()));
                let filteredVisit = arrayVisits.length;
                let result = arrayVisits;
                if (filteredVisit >= Config.tableRows)
                    filteredVisit = Config.tableRows;
                this.load(tableBody, currentPage, result);
                this.pagination(result, tableRows, currentPage);
            });
        };
        this.previewAssist = async () => {
            const openButtons = document.querySelectorAll('#entity-details');
            openButtons.forEach((openButton) => {
                const entityId = openButton.dataset.entityid;
                openButton.addEventListener('click', () => {
                    renderInterface(entityId);
                });
            });
            const renderInterface = async (entity) => {
                let markingData = await getEntityData('Vehicular', entity);
                console.log(markingData);
                renderRightSidebar(UIRightSidebar);
                const _values = {
                    status: document.getElementById('marking-status'),
                    name: document.getElementById('marking-name'),
                    dni: document.getElementById('marking-dni'),
                    type: document.getElementById('marking-type'),
                    department: document.getElementById('marking-department'),
                    contractor: document.getElementById('marking-contractor'),
                    product: document.getElementById('marking-product'),
                    type: document.getElementById('marking-type'),
                    observation: document.getElementById('marking-observation'),
                    dayManager: document.getElementById('marking-dayManager'),
                    nightManager: document.getElementById('marking-nightManager'),
                    // Start marking
                    startDate: document.getElementById('marking-start-date'),
                    startTime: document.getElementById('marking-start-time'),
                    startGuardID: document.getElementById('marking-start-guard-id'),
                    startGuardName: document.getElementById('marking-start-guard-name'),
                    // End marking
                    endDate: document.getElementById('marking-end-date'),
                    endTime: document.getElementById('marking-end-time'),
                    endGuardID: document.getElementById('marking-end-guard-id'),
                    endGuardName: document.getElementById('marking-end-guard-name')
                };
                _values.status.innerText = markingData.visitState.name;
                _values.name.value = markingData.driver;
                _values.dni.value = markingData.dni;
                _values.type.value = markingData.licensePlate;
                _values.department.value = markingData.noGuide;
                _values.contractor.value = markingData.supplier;
                _values.product.value = markingData.product;
                _values.type.value = markingData.type;
                _values.observation.value = markingData.observation;
                _values.dayManager.value = markingData.dayManager;
                _values.nightManager.value = markingData.nightManager;
                // Start marking
                _values.startDate.value = markingData.ingressDate;
                _values.startTime.value = markingData.ingressTime;
                _values.startGuardID.value = markingData.ingressIssued.username;
                _values.startGuardName.value = markingData.ingressIssued.firstName + ' ' + markingData.ingressIssued.lastName;
                // End marking
                _values.endDate.value = markingData.egressDate ? markingData.egressDate : '';
                _values.endTime.value = markingData.egressTime ? markingData.egressTime : '';
                _values.endGuardID.value = markingData.egressIssued.username ? markingData.egressIssued.username : '';
                _values.endGuardName.value = markingData.egressIssued.firstName ? markingData.egressIssued.firstName : '' + ' ' + markingData.egressIssued.lastName ? markingData.egressIssued.lastName : '';
                drawTagsIntoTables();
                this.closeRightSidebar();
                drawTagsIntoTables();
            };
        };
        this.closeRightSidebar = () => {
            const closeButton = document.getElementById('close');
            const editor = document.getElementById('entity-editor-container');
            closeButton.addEventListener('click', () => {
                new CloseDialog().x(editor);
            });
        };
        this.fixCreatedDate = () => {
            const tableDate = document.querySelectorAll('#table-date');
            tableDate.forEach((date) => {
                const separateDateAndTime = date.innerText.split('T');
                date.innerText = separateDateAndTime[0];
            });
        };
    }
}