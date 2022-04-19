<template>
  <footer>
    <div id="footer" class="pt-5 pb-3 text-center text-sm-left">
      <v-container class="grey lighten-5">
        <v-row>
          <v-col cols="12" sm="6" lg="3" class="mb-4">
            <h4 class="mb-3">
              {{ $t('components.footer.connect_with_us') }}
            </h4>
            <VBtn
              href="https://instagram.com/less.borders"
              target="_blank"
              size="small"
              variant="text"
              color="primary"
              class="mb-2 me-2"
              icon="fa-brands fa-instagram"
            />
            <VBtn
              href="https://twitter.com/less_borders"
              target="_blank"
              size="small"
              variant="text"
              color="primary"
              class="mb-2 me-2"
              icon="fa-brands fa-twitter"
            />
            <VBtn
              href="https://facebook.com/lessborders"
              target="_blank"
              size="small"
              variant="text"
              color="primary"
              class="mb-2 me-2"
              icon="fa-brands fa-facebook-f"
            />
          </v-col>
          <v-col cols="12" sm="6" lg="3" class="mb-4"></v-col>
          <v-col cols="12" sm="6" lg="3" class="mb-4">
            <h4 class="footer-header">Support</h4>
            <ul class="list-style-none">
              <li>
                <NuxtLink to="https://lessborders.com/contact">
                  {{ $t('pages.contact.nav') }}
                </NuxtLink>
              </li>
            </ul>
          </v-col>
          <v-col cols="12" sm="6" lg="3" class="mb-4">
            <h4 class="footer-header">Legal</h4>
            <ul class="list-style-none">
              <li>
                <NuxtLink to="https://lessborders.com/legal">
                  {{ $t('pages.legal.nav') }}
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="https://lessborders.com/legal/terms">
                  {{ $t('pages.legal.terms.nav') }}
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="https://lessborders.com/legal/privacy">
                  {{ $t('pages.legal.privacy.nav') }}
                </NuxtLink>
              </li>
            </ul>
          </v-col>
        </v-row>
      </v-container>
    </div>
    <div id="copyright">
      <div class="container pt-3 pb-4">
        <div class="row">
          <div class="col-12 text-center">
            <small>
              &copy; Less Borders {{ new Date().getFullYear() }} - Work smarter
            </small>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script lang="ts" setup>
import { IApp } from '~/utils/app'
const app = useState<IApp>('app')
</script>
