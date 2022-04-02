<template>
    <div class="ms-auto">
        <a class="btn btn-transparent px-3" @click="settingsMenuToggle" rel="nofollow">
            <i class="fa-solid fa-ellipsis-vertical"></i>
        </a>
        <SettingsOffCanvas />
    </div>
</template>

<script setup>
let settingsMenuToggle = () => {
    if (process.client) {
    const settingsMenuOffcanvas = new bootstrap.Offcanvas(
        document.getElementById('settingsMenu')
    )
    settingsMenuOffcanvas.toggle()
    }
}
</script>