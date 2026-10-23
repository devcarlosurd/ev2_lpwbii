<template>
  <div class="min-h-screen flex flex-col bg-slate-50 text-slate-800">
    <Navbar />

    <main class="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Toast de éxito o error -->
      <transition
        enter-active-class="transform ease-out duration-300 transition"
        enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
        enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
        leave-active-class="transition ease-in duration-100"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="toast.visible"
          :class="[
            'fixed bottom-6 right-6 z-50 px-4 py-3 rounded-xl shadow-xl flex items-center space-x-3 text-sm font-medium border',
            toast.type === 'success'
              ? 'bg-emerald-600 text-white border-emerald-500'
              : 'bg-rose-600 text-white border-rose-500'
          ]"
        >
          <span>{{ toast.type === 'success' ? '✅' : '❌' }}</span>
          <span>{{ toast.message }}</span>
        </div>
      </transition>

      <!-- Mensaje cuando falla la conexión con el Backend -->
      <div
        v-if="globalError"
        class="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm"
      >
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center text-xl shrink-0">
            🔌
          </div>
          <div>
            <h4 class="font-bold text-sm text-rose-900">Error de comunicación con la API REST</h4>
            <p class="text-xs text-rose-700 mt-0.5">{{ globalError }}</p>
          </div>
        </div>
        <button
          type="button"
          class="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors shrink-0"
          @click="fetchEquipos"
        >
          Reintentar conexión
        </button>
      </div>

      <!-- Tarjetas estadísticas -->
      <section class="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-8">
        <div class="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <span class="text-xs font-medium text-slate-500">Total Equipos</span>
          <p class="text-2xl font-bold text-slate-900 mt-1">{{ equipos.length }}</p>
        </div>
        <div class="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <span class="text-xs font-medium text-emerald-600">Disponibles</span>
          <p class="text-2xl font-bold text-emerald-700 mt-1">{{ stats.disponibles }}</p>
        </div>
        <div class="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <span class="text-xs font-medium text-blue-600">En uso</span>
          <p class="text-2xl font-bold text-blue-700 mt-1">{{ stats.enUso }}</p>
        </div>
        <div class="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <span class="text-xs font-medium text-amber-600">En mantención</span>
          <p class="text-2xl font-bold text-amber-700 mt-1">{{ stats.mantencion }}</p>
        </div>
        <div class="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs col-span-2 sm:col-span-1">
          <span class="text-xs font-medium text-rose-600">De baja</span>
          <p class="text-2xl font-bold text-rose-700 mt-1">{{ stats.baja }}</p>
        </div>
      </section>

      <!-- Barra de Filtros y Búsqueda -->
      <div class="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs mb-6">
        <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
          <!-- Búsqueda en tiempo real -->
          <div class="w-full sm:w-80 relative">
            <span class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              🔍
            </span>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Buscar por nombre, código, ubicación..."
              class="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
            />
          </div>

          <div class="flex flex-wrap items-center gap-3 w-full sm:w-auto justify-end">
            <!-- Selector Tipo -->
            <select
              v-model="filterTipo"
              class="px-3 py-2 text-sm rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition"
            >
              <option value="">Todos los tipos</option>
              <option value="Notebook">Notebooks</option>
              <option value="PC">PCs</option>
              <option value="Monitor">Monitores</option>
              <option value="Proyector">Proyectores</option>
              <option value="Servidor">Servidores</option>
            </select>

            <!-- Selector Estado -->
            <select
              v-model="filterEstado"
              class="px-3 py-2 text-sm rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition"
            >
              <option value="">Todos los estados</option>
              <option value="Disponible">Disponible</option>
              <option value="En uso">En uso</option>
              <option value="Mantención">Mantención</option>
              <option value="Baja">Baja</option>
            </select>

            <!-- Botón Crear -->
            <button
              type="button"
              class="px-4 py-2 text-sm font-semibold rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 shadow-xs transition-colors flex items-center space-x-2"
              @click="openCreateModal"
            >
              <span>➕</span>
              <span>Nuevo Equipo</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Estado de Carga (Spinner) -->
      <div v-if="isLoading" class="py-20 flex flex-col items-center justify-center space-y-3">
        <div class="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
        <p class="text-sm font-medium text-slate-500">Cargando inventario de equipos...</p>
      </div>

      <!-- Tabla de Equipos -->
      <div v-else class="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <th class="py-3.5 px-4">Código</th>
                <th class="py-3.5 px-4">Equipo / Marca / Modelo</th>
                <th class="py-3.5 px-4">Tipo</th>
                <th class="py-3.5 px-4">Ubicación</th>
                <th class="py-3.5 px-4">Estado</th>
                <th class="py-3.5 px-4">Fecha Adq.</th>
                <th class="py-3.5 px-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 text-sm">
              <tr v-if="filteredEquipos.length === 0">
                <td colspan="7" class="py-12 text-center text-slate-400">
                  <div class="text-3xl mb-2">📦</div>
                  <p class="font-medium text-slate-600">No se encontraron equipos registrados</p>
                  <p class="text-xs text-slate-400 mt-1">Pruebe ajustando los filtros o registre un nuevo equipo</p>
                </td>
              </tr>

              <tr
                v-for="item in filteredEquipos"
                :key="item.id"
                class="hover:bg-slate-50/80 transition-colors"
              >
                <td class="py-3.5 px-4 font-mono font-semibold text-indigo-600">
                  {{ item.codigoInventario }}
                </td>
                <td class="py-3.5 px-4">
                  <p class="font-semibold text-slate-900 leading-tight">{{ item.nombre }}</p>
                  <p class="text-xs text-slate-500 mt-0.5">{{ item.marca }} · {{ item.modelo }}</p>
                </td>
                <td class="py-3.5 px-4 text-slate-600">
                  <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-700">
                    {{ item.tipo }}
                  </span>
                </td>
                <td class="py-3.5 px-4 text-slate-600 text-xs">
                  📍 {{ item.ubicacion }}
                </td>
                <td class="py-3.5 px-4">
                  <span :class="['inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border', getStatusBadgeClass(item.estado)]">
                    {{ item.estado }}
                  </span>
                </td>
                <td class="py-3.5 px-4 text-slate-500 text-xs">
                  {{ formatDate(item.fechaAdquisicion) }}
                </td>
                <td class="py-3.5 px-4 text-right space-x-1">
                  <button
                    type="button"
                    class="p-1.5 rounded-lg text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                    title="Ver detalle del equipo"
                    @click="openDetailModal(item)"
                  >
                    👁️
                  </button>
                  <button
                    type="button"
                    class="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                    title="Editar equipo"
                    @click="openEditModal(item)"
                  >
                    ✏️
                  </button>
                  <button
                    type="button"
                    class="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                    title="Eliminar equipo"
                    @click="openConfirmDelete(item)"
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>

    <!-- Modales -->
    <EquipoFormModal
      :is-open="isFormOpen"
      :initial-data="selectedEquipo"
      :is-submitting="isSubmitting"
      :server-error="formServerError"
      @save="handleSaveEquipo"
      @cancel="closeFormModal"
    />

    <EquipoDetailModal
      :is-open="isDetailOpen"
      :equipo="selectedEquipo"
      @close="closeDetailModal"
      @edit="handleEditFromDetail"
    />

    <ConfirmModal
      :is-open="isConfirmOpen"
      :message="confirmMessage"
      :is-deleting="isDeleting"
      @confirm="handleConfirmDelete"
      @cancel="closeConfirmModal"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, reactive } from 'vue';
import { api } from './services/api';
import Navbar from './components/Navbar.vue';
import EquipoFormModal from './components/EquipoFormModal.vue';
import EquipoDetailModal from './components/EquipoDetailModal.vue';
import ConfirmModal from './components/ConfirmModal.vue';

// 1. Estado reactivo principal (ref)
const equipos = ref([]);
const isLoading = ref(true);
const globalError = ref('');

// 2. Filtros y Búsqueda
const searchQuery = ref('');
const filterTipo = ref('');
const filterEstado = ref('');

// 3. Modales
const isFormOpen = ref(false);
const isDetailOpen = ref(false);
const isConfirmOpen = ref(false);
const selectedEquipo = ref(null);
const isSubmitting = ref(false);
const isDeleting = ref(false);
const formServerError = ref('');
const confirmMessage = ref('');

// 4. Notificación flotante (toast)
const toast = reactive({
  visible: false,
  message: '',
  type: 'success',
  timeoutId: null,
});

function showToast(message, type = 'success') {
  if (toast.timeoutId) clearTimeout(toast.timeoutId);
  toast.message = message;
  toast.type = type;
  toast.visible = true;
  toast.timeoutId = setTimeout(() => {
    toast.visible = false;
  }, 3500);
}

// 5. Cargar equipos desde la API REST
async function fetchEquipos() {
  isLoading.value = true;
  globalError.value = '';
  try {
    const data = await api.getEquipos();
    equipos.value = data;
  } catch (err) {
    globalError.value = err.message || 'No se pudo conectar con el servidor NestJS.';
  } finally {
    isLoading.value = false;
  }
}

// Se ejecuta al montar el componente en el navegador
onMounted(() => {
  fetchEquipos();
});

// 6. Métricas computadas automáticas
const stats = computed(() => ({
  disponibles: equipos.value.filter((e) => e.estado === 'Disponible').length,
  enUso: equipos.value.filter((e) => e.estado === 'En uso').length,
  mantencion: equipos.value.filter((e) => e.estado === 'Mantención').length,
  baja: equipos.value.filter((e) => e.estado === 'Baja').length,
}));

// 7. Filtro reactivo en tiempo real (computed)
const filteredEquipos = computed(() => {
  return equipos.value.filter((e) => {
    const q = searchQuery.value.trim().toLowerCase();
    const matchesSearch =
      !q ||
      e.nombre.toLowerCase().includes(q) ||
      e.codigoInventario.toLowerCase().includes(q) ||
      e.marca.toLowerCase().includes(q) ||
      e.modelo.toLowerCase().includes(q) ||
      e.ubicacion.toLowerCase().includes(q);

    const matchesTipo = !filterTipo.value || e.tipo === filterTipo.value;
    const matchesEstado = !filterEstado.value || e.estado === filterEstado.value;

    return matchesSearch && matchesTipo && matchesEstado;
  });
});

// Funciones para modales
function openCreateModal() {
  selectedEquipo.value = null;
  formServerError.value = '';
  isFormOpen.value = true;
}

function openEditModal(equipo) {
  selectedEquipo.value = { ...equipo };
  formServerError.value = '';
  isFormOpen.value = true;
}

function handleEditFromDetail(equipo) {
  closeDetailModal();
  openEditModal(equipo);
}

function closeFormModal() {
  isFormOpen.value = false;
  selectedEquipo.value = null;
  formServerError.value = '';
}

function openDetailModal(equipo) {
  selectedEquipo.value = equipo;
  isDetailOpen.value = true;
}

function closeDetailModal() {
  isDetailOpen.value = false;
  selectedEquipo.value = null;
}

function openConfirmDelete(equipo) {
  selectedEquipo.value = equipo;
  confirmMessage.value = `¿Está seguro de que desea eliminar el equipo "${equipo.nombre}" (${equipo.codigoInventario}) del inventario?`;
  isConfirmOpen.value = true;
}

function closeConfirmModal() {
  isConfirmOpen.value = false;
  selectedEquipo.value = null;
}

// 8. Guardar (POST o PATCH)
async function handleSaveEquipo({ isEditing, id, data }) {
  isSubmitting.value = true;
  formServerError.value = '';
  try {
    if (isEditing) {
      const updated = await api.updateEquipo(id, data);
      const index = equipos.value.findIndex((e) => e.id === id);
      if (index !== -1) {
        equipos.value[index] = updated; // Actualización reactiva instantánea
      }
      showToast('Equipo actualizado exitosamente.', 'success');
    } else {
      const created = await api.createEquipo(data);
      equipos.value.unshift(created); // Agrega al inicio sin recargar
      showToast('Equipo registrado exitosamente en el inventario.', 'success');
    }
    closeFormModal();
  } catch (err) {
    formServerError.value = err.message || 'Ocurrió un error al guardar el equipo.';
  } finally {
    isSubmitting.value = false;
  }
}

// 9. Eliminar (DELETE)
async function handleConfirmDelete() {
  if (!selectedEquipo.value) return;
  const idToDelete = selectedEquipo.value.id;
  isDeleting.value = true;
  try {
    await api.deleteEquipo(idToDelete);
    equipos.value = equipos.value.filter((e) => e.id !== idToDelete); // Quita de la pantalla de inmediato
    showToast('Equipo eliminado exitosamente.', 'success');
    closeConfirmModal();
  } catch (err) {
    showToast(err.message || 'Error al eliminar el equipo.', 'error');
  } finally {
    isDeleting.value = false;
  }
}

function getStatusBadgeClass(estado) {
  switch (estado) {
    case 'Disponible': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    case 'En uso': return 'bg-blue-50 text-blue-700 border-blue-200';
    case 'Mantención': return 'bg-amber-50 text-amber-700 border-amber-200';
    case 'Baja': return 'bg-rose-50 text-rose-700 border-rose-200';
    default: return 'bg-slate-100 text-slate-700 border-slate-300';
  }
}

function formatDate(dateStr) {
  if (!dateStr) return 'N/A';
  const parts = dateStr.split('T')[0].split('-');
  return parts.length === 3 ? `${parts[2]}/${parts[1]}/${parts[0]}` : dateStr;
}
</script>