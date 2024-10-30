<template>
  <div class="main-container">
    <div class="content">
        <div class="content-align">
            <h1 class="h1">{{ $t('aboutTitle') }}</h1>
            <div class="text-wrap">
                <div class="text" v-html="t('text1')"></div>
            </div>

            <h2 class="h2">{{ $t('text2') }}</h2>
            <div class="text-wrap">
                <div class="text">{{ $t('text3') }}</div>
            </div>

            <h2 class="h2">{{ $t('text4') }}</h2>
            <div class="text-wrap">
                <div class="text">{{ $t('text5') }}</div>
                <ul class="text-ul">
                    <li class="text-li">
                        <div class="text">
                            {{ $t('text6') }}                                
                        </div>
                        <ul class="text-ul-sub">
                            <li class="text-li-sub"><div class="text">{{ $t('text7') }}</div></li>
                            <li class="text-li-sub"><div class="text">{{ $t('text8') }}</div></li>
                        </ul>
                    </li>

                    <li class="text-li"><div class="text">{{ $t('text9') }}</div></li>
                    <li class="text-li"><div class="text">{{ $t('text10') }}</div></li>
                    <li class="text-li"><div class="text">{{ $t('text11') }}</div></li>
                    <li class="text-li"><div class="text">{{ $t('text12') }}</div></li>
                </ul>
                <div class="text">{{ $t('text13') }}</div>
            </div>

            <div class="text-wrap">
                <div class="text">
                    <strong>{{ $t('text14') }}</strong>
                </div>
                <ul class="text-ul">
                    <li class="text-li"><div class="text">{{ $t('text15') }}</div></li>
                    <li class="text-li"><div class="text">{{ $t('text16') }}</div></li>
                    <li class="text-li"><div class="text" v-html="t('text17')"></div></li>
                </ul>
            </div>
            
            <div class="text-wrap">
                <div class="text" v-html="t('text18')"></div>
            </div>

            <div class="text-wrap">
                <div class="text">
                    {{ $t('text19') }}
                </div>
                <div class="img-wrap">
                    <img src="/src/assets/img/map.png" class="img">
                </div>
            </div>  
            
        </div>      
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

</script>

<style lang="scss" scoped>
@use '../styles/views/about' as *;
</style>