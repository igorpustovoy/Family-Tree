<script setup lang="ts"></script>

<template>
  <main>
    <v-timeline class="timeline" direction="vertical" side="end" align="start">
      <v-timeline-item class="timeline-item" size="small" nodeColor="">
        <div>
          <div class="timeline-item__title text-h6">Create an Account</div>
        </div>
      </v-timeline-item>

      <v-timeline-item class="timeline-item" size="small">
        <div>
          <div class="timeline-item__title text-h6">Interact</div>
          <p class="timeline-item__text">
            You can interact with other users by clicking the button in the left
            top corner of your screen.
          </p>
        </div>
      </v-timeline-item>

      <v-timeline-item class="timeline-item" size="small">
        <div>
          <div class="timeline-item__title text-h6">Family tree</div>
          <p class="timeline-item__text">
            Create your own family tree. Click the link in the right top corner
            of your screen. It will be created when you add your first family
            member.
          </p>
        </div>
      </v-timeline-item>

      <v-timeline-item class="timeline-item" size="small">
        <div>
          <div class="timeline-item__title text-h6">Play around</div>
          <p class="timeline-item__text">
            Add more children and spouses to your family tree.
          </p>
        </div>
      </v-timeline-item>

      <v-timeline-item class="timeline-item" size="small">
        <div>
          <div class="timeline-item__title text-h6">Copy</div>
          <p class="timeline-item__text">
            You can copy parts of other users' family trees by visiting them
            through social tab.
          </p>
        </div>
      </v-timeline-item>
    </v-timeline>
  </main>
</template>

<style lang="scss" scoped>
@import "@/assets/_variables.scss";
main {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 800px;
  margin: 0 auto;
  padding: 0;
}
.timeline {
  margin-left: 70px;
  padding-right: 40px;
  .timeline-item {
    .timeline-item__title {
      color: $theme-color;
    }
    .timeline-item__text {
      max-width: 300px;
    }
  }

  @media (max-width: 800px) {
    margin-top: 100px;
    margin-left: 10px;
  }
  @media (max-width: 400px) {
    margin-top: 200px;
  }
}
</style>
