//
//  Layout.ts
//
//  Generated by Poll Castillo on 09/03/2023.
//
export const UIContentLayout = `
    <div class="datatable" id="datatable">
        <div class="datatable_header">
            <div class="datatable_title"><h1 id="view-title"></h1></div>
            <div class="datatable_tools" id="datatable-tools">
                <label><input type="checkbox" class="checkbox" id="entity-check"> Todas las empresas  |</label>
                <input type="search" class="search_input" placeholder="Buscar" id="search">
                <button
                    class="datatable_button add_user"
                    id="btnSearch">
                    <i class="fa-solid fa-search"></i>
                </button>
                <button class="datatable_button import_user" id="export-entities">Exportar</button>
            </div>
        </div>

        <table class="datatable_content">
        <thead><tr>
            <th><span data-type="customer">
            Empresa <i class="fa-regular fa-filter"></i>
            </span></th>

            <th><span data-type="title">
            Título <i class="fa-regular fa-filter"></i>
            </span></th>

            <th><span data-type="content">
            Contenido <i class="fa-regular fa-filter"></i>
            </span></th>

            <th><span data-type="user">
            Usuario <i class="fa-regular fa-filter"></i>
            </span></th>

            <th class="thead_centered" width=220><span data-type="date">
            Fecha <i class="fa-regular fa-filter"></i>
            </span></th>

            <th class="thead_centered" width=130><span data-type="details">
            Detalles
            </span></th>

        </tr></thead>
        <tbody id="datatable-body" class="datatable_body">

        </tbody>
        </table>
    </div>

    <!-- The Modal -->
    <div id="modalZoom" class="modal_zoom">
        <span class="close-zoom" id="close-modalZoom">&times;</span>
        <img class="modal-content-zoom" id="img01">
        <div id="caption" class="caption-zoom"></div>
    </div>
    
    <div class="datatable_footer">
        <div class="datatable_pagination" id="pagination-container"></div>
    </div>
    `;
export const UIRightSidebar = `
    <div class="entity_editor" id="entity-editor">
    <div class="entity_editor_header">
      <div class="user_info">
        <div class="avatar"><i class="fa-regular fa-megaphone"></i></div>
        <h1 class="entity_editor_title">Detalles del <br><small>evento</small></h1>
      </div>

      <button class="btn btn_close_editor" id="close"><i class="fa-solid fa-x"></i></button>
    </div>

    <!-- EDITOR BODY -->
    <div class="entity_editor_body">
        <div id="event-picture-placeholder">

        </div>

        <h2 id="event-title">Cargando</h2>
        <p id="event-content" class="margin_t_8"  style="word-break: break-all">Por favor espere...</p><br><br>

        <div class="input_detail">
            <label for="event-author"><i class="fa-solid fa-user"></i></label>
            <input type="text" id="event-author" class="input_filled" readonly>
        </div>
        <br>
        <div class="input_detail">
            <label for="event-author-id"><i class="fa-solid fa-at"></i></label>
            <input type="text" id="event-author-id" class="input_filled" readonly>
        </div>
        <br>
        <div class="input_detail">
            <label for="creation-date"><i class="fa-solid fa-calendar"></i></label>
            <input type="date" id="creation-date" class="input_filled" readonly>
        </div>
        <br>
        <div class="input_detail">
            <label for="creation-time"><i class="fa-solid fa-clock"></i></label>
            <input type="time" id="creation-time" class="input_filled" readonly>
        </div>

    </div>
    <!-- END EDITOR BODY -->
    </div>
    `;
