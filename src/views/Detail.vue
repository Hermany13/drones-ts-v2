<template>
    <div class="detail">
        <div class="detail-content">
            <div class="app-container">
                <div class="content-header">
                    <div>
                        <img v-bind:src="drone.image"/>
                    </div>
                </div>

                <div class="drone-name">
                    {{ drone.id }}
                </div>
                <div class="other-details-container">
                    <div class="row-container">
                        <div class="detail-label">
                            Customer
                        </div>
                        <div class="detail-data">
                            {{ drone.name }}
                        </div>
                    </div>
                    <div class="row-container">
                        <div class="detail-label">
                            Address
                        </div>
                        <div class="detail-data">
                            {{ drone.address }}
                        </div>
                    </div>
                    <div class="row-container">
                        <div class="detail-label">
                            Battery
                        </div>
                        <div class="detail-data">
                            {{ drone.battery }}%
                        </div>
                    </div>
                    <div class="row-container">
                        <div class="detail-label">
                            Max speed
                        </div>
                        <div class="detail-data">
                            <SpeedMarker :speed="drone.max_speed"/>
                        </div>
                    </div>
                    <div class="row-container">
                        <div class="detail-label">
                            Average speed
                        </div>
                        <div class="detail-data">
                            <SpeedMarker :speed="drone.average_speed"/>
                        </div>
                    </div>
                    <div class="row-container">
                        <div class="detail-label">
                            Current fly
                        </div>
                        <div class="detail-data">
                            {{ drone.fly }}%
                        </div>
                    </div>
                    <div class="row-container">
                        <div class="detail-label">
                            Status
                        </div>
                        <div class="detail-data">
                            {{ drone.status }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
    .detail-content {
        width: 100%;
        display: flex;
        justify-content: center;
    }

    .detail-content > .app-container {
        width: 1060px;
    }

    .detail-content > .app-container > .content-header {
        display: flex;
        justify-content: center;
        width: 100%;
        margin-top: 20px;
    }

    .detail-content > .app-container > .content-header > div {
        width: 200px;
        height: 200px;
        background-color: #bde0ff;
        border-radius: 100px;
    }

    .detail-content > .app-container > .content-header > div > img {
        width: 75%;
        object-fit: cover;
    }

    .detail-content > .app-container > .drone-name {
        font-size: 35px;
        font-weight: bold;
        color: #32a0ff;
        margin-top: 10px;
    }

    .detail-content > .app-container > .other-details-container {
        width: 65%;
        margin: 0 auto;
    }

    .detail-content > .app-container > .other-details-container > .row-container {
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin-top: 10px;
        padding: 10px;
    }

    .detail-content > .app-container > .other-details-container >
    .row-container > .detail-label, .detail-data {
        font-size: 23px;
        color: #32a0ff;
    }

    .detail-content > .app-container > .other-details-container >
    .row-container > .detail-label {
        font-weight: bold;
    }

    @media(max-width: 480px) {
    .detail-content > .app-container {
        width: 100%;
    }

    .detail-content > .app-container > .other-details-container {
        width: 95%;
        margin: 0 auto;
    }
  }

</style>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

// Services
import { fetchQuery } from '@/services/drones';

// Components
import SpeedMarker from '@/components/SpeedMarker.vue';

@Component({
    components: {
    SpeedMarker,
  }
})
export default class Detail extends Vue {
    drone: object = {};

    async mounted() {
        this.drone = await fetchQuery(`/${this.$router.currentRoute.params.id}`);
    }
}
</script>
