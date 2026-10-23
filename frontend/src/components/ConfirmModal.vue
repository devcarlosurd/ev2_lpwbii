<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs transition-opacity"
    @click.self="$emit('cancel')"
  >
    <div class="relative bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100 transform transition-all">
      <div class="flex items-center space-x-3 text-rose-600 mb-4">
        <div class="w-10 h-10 rounded-full bg-rose-50 flex items-center justify-center text-xl font-bold">
          ⚠️
        </div>
        <div>
          <h3 class="text-lg font-bold text-slate-900">
            {{ title || 'Confirmar eliminación' }}
          </h3>
          <p class="text-xs text-slate-500">Acción irreversible en la base de datos</p>
        </div>
      </div>

      <p class="text-sm text-slate-600 leading-relaxed mb-6">
        {{ message }}
      </p>

      <div class="flex items-center justify-end space-x-3">
        <button
          type="button"
          class="px-4 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100 border border-slate-300 transition-colors"
          :disabled="isDeleting"
          @click="$emit('cancel')"
        >
          Cancelar
        </button>
        <button
          type="button"
          class="px-4 py-2 rounded-lg text-sm font-medium text-white bg-rose-600 hover:bg-rose-700 shadow-sm transition-colors flex items-center space-x-2 disabled:opacity-50"
          :disabled="isDeleting"
          @click="$emit('confirm')"
        >
          <span v-if="isDeleting" class="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
          <span>{{ isDeleting ? 'Eliminando...' : 'Sí, eliminar equipo' }}</span>
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
  title: {
    type: String,
    default: '',
  },
  message: {
    type: String,
    default: '¿Está seguro de que desea eliminar este equipo? Esta acción no se puede deshacer.',
  },
  isDeleting: {
    type: Boolean,
    default: false,
  },
});

defineEmits(['confirm', 'cancel']);
</script>
