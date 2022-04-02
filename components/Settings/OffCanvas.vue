<template>
      <div
        id="settingsMenu"
        class="offcanvas offcanvas-end text-start"
        tabindex="-1"
        aria-labelledby="settingsMenuLabel"
      >
        <div class="offcanvas-header">
          <h6 id="settingsMenuLabel" class="offcanvas-title">
            {{ $t('components.settings.title') }}
          </h6>
          <button
            type="button"
            class="btn btn-transparent"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          >
            <i class="fa-solid fa-xmark fa-lg"></i>
          </button>
        </div>
        <div class="offcanvas-body p-0">
          <SettingsMenu />
        </div>
      </div>
</template>