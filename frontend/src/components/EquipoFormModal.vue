<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs transition-opacity"
    @click.self="handleCancel"
  >
    <div class="relative bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto">
      <!-- Encabezado del Formulario -->
      <div class="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
        <div>
          <h3 class="text-xl font-bold text-slate-900">
            {{ isEditing ? 'Editar Equipo Tecnológico' : 'Registrar Nuevo Equipo' }}
          </h3>
          <p class="text-xs text-slate-500 mt-0.5">
            {{ isEditing ? `Modificando registro #${initialData?.id}` : 'Complete todos los campos obligatorios (*)' }}
          </p>
        </div>
        <button
          type="button"
          class="text-slate-400 hover:text-slate-600 rounded-lg p-1 text-xl leading-none"
          @click="handleCancel"
        >
          ✕
        </button>
      </div>

      <!-- Alerta de Error de Servidor o Validación -->
      <div
        v-if="serverError"
        class="mb-4 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium flex items-start space-x-2"
      >
        <span class="text-base leading-none">⚠️</span>
        <div class="flex-1">
          <p class="font-bold">Error al procesar la solicitud:</p>
          <p class="mt-0.5 whitespace-pre-line">{{ serverError }}</p>
        </div>
      </div>

      <!-- Formulario -->
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <!-- Código de Inventario -->
          <div>
            <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Código Inventario *
            </label>
            <input
              v-model="form.codigoInventario"
              type="text"
              required
              minlength="3"
              placeholder="Ej: EQ-NOT-001"
              class="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
              :class="{ 'border-rose-400 bg-rose-50/30': errors.codigoInventario }"
            />
            <p v-if="errors.codigoInventario" class="text-rose-500 text-xs mt-1">
              {{ errors.codigoInventario }}
            </p>
          </div>

          <!-- Nombre del Equipo -->
          <div>
            <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Nombre *
            </label>
            <input
              v-model="form.nombre"
              type="text"
              required
              minlength="3"
              placeholder="Ej: Notebook Dell Latitude"
              class="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
              :class="{ 'border-rose-400 bg-rose-50/30': errors.nombre }"
            />
            <p v-if="errors.nombre" class="text-rose-500 text-xs mt-1">
              {{ errors.nombre }}
            </p>
          </div>

          <!-- Tipo de Equipo -->
          <div>
            <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Tipo *
            </label>
            <select
              v-model="form.tipo"
              required
              class="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition bg-white"
            >
              <option value="" disabled>Seleccione un tipo</option>
              <option value="Notebook">Notebook</option>
              <option value="PC">PC</option>
              <option value="Monitor">Monitor</option>
              <option value="Proyector">Proyector</option>
              <option value="Servidor">Servidor</option>
              <option value="Impresora">Impresora</option>
              <option value="Otro">Otro</option>
            </select>
          </div>

          <!-- Estado -->
          <div>
            <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Estado *
            </label>
            <select
              v-model="form.estado"
              required
              class="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition bg-white"
            >
              <option value="Disponible">Disponible</option>
              <option value="En uso">En uso</option>
              <option value="Mantención">Mantención</option>
              <option value="Baja">Baja</option>
            </select>
          </div>

          <!-- Marca -->
          <div>
            <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Marca *
            </label>
            <input
              v-model="form.marca"
              type="text"
              required
              placeholder="Ej: Dell, HP, Lenovo"
              class="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
            />
          </div>

          <!-- Modelo -->
          <div>
            <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Modelo *
            </label>
            <input
              v-model="form.modelo"
              type="text"
              required
              placeholder="Ej: Latitude 5420"
              class="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
            />
          </div>

          <!-- Ubicación -->
          <div>
            <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Ubicación *
            </label>
            <input
              v-model="form.ubicacion"
              type="text"
              required
              placeholder="Ej: Laboratorio 1 - Chillán"
              class="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
            />
          </div>

          <!-- Fecha de Adquisición -->
          <div>
            <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Fecha de Adquisición *
            </label>
            <input
              v-model="form.fechaAdquisicion"
              type="date"
              required
              class="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition bg-white"
            />
          </div>
        </div>

        <!-- Observaciones -->
        <div>
          <label class="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
            Observaciones (Opcional)
          </label>
          <textarea
            v-model="form.observaciones"
            rows="3"
            placeholder="Detalles adicionales sobre el equipamiento, garantía o periféricos..."
            class="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
          ></textarea>
        </div>

        <!-- Botones de Acción -->
        <div class="flex items-center justify-end space-x-3 pt-4 border-t border-slate-100">
          <button
            type="button"
            class="px-4 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100 border border-slate-300 transition-colors"
            :disabled="isSubmitting"
            @click="handleCancel"
          >
            Cancelar
          </button>
          <button
            type="submit"
            class="px-5 py-2 rounded-lg text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm transition-colors flex items-center space-x-2 disabled:opacity-50"
            :disabled="isSubmitting"
          >
            <span v-if="isSubmitting" class="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            <span>{{ isSubmitting ? 'Guardando...' : (isEditing ? 'Guardar Cambios' : 'Registrar Equipo') }}</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, watch, ref } from 'vue';

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  initialData: {
    type: Object,
    default: null,
  },
  isSubmitting: {
    type: Boolean,
    default: false,
  },
  serverError: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['save', 'cancel']);

const isEditing = ref(false);
const errors = reactive({
  codigoInventario: '',
  nombre: '',
});

const defaultForm = () => ({
  codigoInventario: '',
  nombre: '',
  tipo: '',
  marca: '',
  modelo: '',
  ubicacion: '',
  estado: 'Disponible',
  fechaAdquisicion: new Date().toISOString().split('T')[0],
  observaciones: '',
});

const form = reactive(defaultForm());

watch(
  () => props.initialData,
  (data) => {
    errors.codigoInventario = '';
    errors.nombre = '';
    if (data && data.id) {
      isEditing.value = true;
      form.codigoInventario = data.codigoInventario || '';
      form.nombre = data.nombre || '';
      form.tipo = data.tipo || '';
      form.marca = data.marca || '';
      form.modelo = data.modelo || '';
      form.ubicacion = data.ubicacion || '';
      form.estado = data.estado || 'Disponible';
      // Ajustar fecha para input type="date"
      form.fechaAdquisicion = data.fechaAdquisicion ? data.fechaAdquisicion.split('T')[0] : '';
      form.observaciones = data.observaciones || '';
    } else {
      isEditing.value = false;
      Object.assign(form, defaultForm());
    }
  },
  { immediate: true },
);

function validateLocal() {
  let valid = true;
  errors.codigoInventario = '';
  errors.nombre = '';

  if (!form.codigoInventario || form.codigoInventario.trim().length < 3) {
    errors.codigoInventario = 'El código debe tener al menos 3 caracteres.';
    valid = false;
  }
  if (!form.nombre || form.nombre.trim().length < 3) {
    errors.nombre = 'El nombre debe tener al menos 3 caracteres.';
    valid = false;
  }
  return valid;
}

function handleSubmit() {
  if (!validateLocal()) return;
  emit('save', {
    isEditing: isEditing.value,
    id: props.initialData?.id,
    data: { ...form },
  });
}

function handleCancel() {
  emit('cancel');
}
</script>
