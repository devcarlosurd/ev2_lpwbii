<template>
  <div
    v-if="isOpen && equipo"
    class="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs transition-opacity"
    @click.self="$emit('close')"
  >
    <div class="relative bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-100">
      <!-- Encabezado del Modal -->
      <div class="flex items-start justify-between border-b border-slate-100 pb-4 mb-4">
        <div>
          <div class="flex items-center space-x-2">
            <span class="px-2.5 py-0.5 rounded-md text-xs font-mono font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
              {{ equipo.codigoInventario }}
            </span>
            <span :class="['px-2.5 py-0.5 rounded-full text-xs font-semibold border', getStatusBadgeClass(equipo.estado)]">
              {{ equipo.estado }}
            </span>
          </div>
          <h3 class="text-xl font-bold text-slate-900 mt-2">
            {{ equipo.nombre }}
          </h3>
        </div>
        <button
          type="button"
          class="text-slate-400 hover:text-slate-600 rounded-lg p-1 text-xl leading-none"
          @click="$emit('close')"
        >
          ✕
        </button>
      </div>

      <!-- Datos del Equipo en Rejilla -->
      <div class="grid grid-cols-2 gap-4 text-sm text-slate-600 mb-6">
        <div class="p-3 bg-slate-50 rounded-xl">
          <p class="text-xs text-slate-400 uppercase font-semibold">Tipo de Equipo</p>
          <p class="font-medium text-slate-800 mt-0.5">{{ equipo.tipo }}</p>
        </div>

        <div class="p-3 bg-slate-50 rounded-xl">
          <p class="text-xs text-slate-400 uppercase font-semibold">Marca y Modelo</p>
          <p class="font-medium text-slate-800 mt-0.5">{{ equipo.marca }} {{ equipo.modelo }}</p>
        </div>

        <div class="p-3 bg-slate-50 rounded-xl">
          <p class="text-xs text-slate-400 uppercase font-semibold">Ubicación Física</p>
          <p class="font-medium text-slate-800 mt-0.5">{{ equipo.ubicacion }}</p>
        </div>

        <div class="p-3 bg-slate-50 rounded-xl">
          <p class="text-xs text-slate-400 uppercase font-semibold">Fecha de Adquisición</p>
          <p class="font-medium text-slate-800 mt-0.5">{{ formatDate(equipo.fechaAdquisicion) }}</p>
        </div>

        <div class="col-span-2 p-3 bg-slate-50 rounded-xl">
          <p class="text-xs text-slate-400 uppercase font-semibold">Observaciones</p>
          <p class="font-medium text-slate-800 mt-0.5 whitespace-pre-line">
            {{ equipo.observaciones || 'Sin observaciones registradas.' }}
          </p>
        </div>
      </div>

      <!-- Pie del Modal -->
      <div class="flex justify-end space-x-3 pt-2 border-t border-slate-100">
        <button
          type="button"
          class="px-4 py-2 rounded-lg text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
          @click="$emit('close')"
        >
          Cerrar
        </button>
        <button
          type="button"
          class="px-4 py-2 rounded-lg text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
          @click="$emit('edit', equipo)"
        >
          Editar Equipo
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  equipo: {
    type: Object,
    default: null,
  },
});

defineEmits(['close', 'edit']);

function getStatusBadgeClass(estado) {
  switch (estado) {
    case 'Disponible':
      return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    case 'En uso':
      return 'bg-blue-50 text-blue-700 border-blue-200';
    case 'Mantención':
      return 'bg-amber-50 text-amber-700 border-amber-200';
    case 'Baja':
      return 'bg-rose-50 text-rose-700 border-rose-200';
    default:
      return 'bg-slate-100 text-slate-700 border-slate-300';
  }
}

function formatDate(dateStr) {
  if (!dateStr) return 'N/A';
  // Soporta cadenas ISO YYYY-MM-DD
  const parts = dateStr.split('T')[0].split('-');
  if (parts.length === 3) {
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
  }
  return dateStr;
}
</script>
