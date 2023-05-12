<script setup lang="ts">
import ProgressBar from '@/components/ProgressBar.vue'
import { TechnicalSkill, TechnicalSkillItem } from '@/models/technical-skill.model'
import { technicalSkills as technicalSkillsJohannes } from '@/data/johannes'
import { technicalSkills } from '@/data/marie'
import { computed, ref } from 'vue'
import VideoPlayer from '@/components/VideoPlayer.vue'

const total = (technicalSkill: TechnicalSkill) => {
    return accumulateValue(technicalSkill.items, 'score')
}

const maximalTotal = (technicalSkill: TechnicalSkill) => {
    return accumulateValue(technicalSkill.items, 'maximalScore')
}

const average = (technicalSkill: TechnicalSkill) => {
    if (technicalSkill.items.length === 1) {
        return technicalSkill.items[0].score || 0
    }

    const scoredItems: TechnicalSkillItem[] = technicalSkill.items.filter(
        (technicalSkillItem: TechnicalSkillItem) => technicalSkillItem.score !== null
    )

    return (accumulateValue(scoredItems, 'score') / scoredItems.length).toFixed(1)
}

const accumulateValue = (items: TechnicalSkillItem[], key: string): number => {
    return Number(
        items
            .map((item: TechnicalSkillItem) => item[key as keyof TechnicalSkillItem] as number)
            .reduce((previousValue, currentValue) => (previousValue || 0) + (currentValue || 0), 0)
    )
}

const dataMap = {
    marie: technicalSkills,
    johannes: technicalSkillsJohannes
}

const selected = ref({
    title: 'Bitte wählen',
    value: ''
})

const selectItems = [
    { title: 'Marie', value: 'marie' },
    { title: 'Johannes', value: 'johannes' }
]

const items = computed(() => {
    return dataMap[selected.value]
})

// Video
// loop
// start automaticly when hidden in small mode

// main max width 500px
</script>

<template>
    <v-container>
        <h2 class="pagetitle">Technical goal</h2>
        <v-select
            v-model="selected"
            :items="selectItems"
            label="Student"
            density="compact"
        ></v-select>
        <VideoPlayer></VideoPlayer>
        <v-expansion-panels variant="accordion" :multiple="true" class="technical-skills-panels">
            <v-expansion-panel v-for="technicalSkill in items" :key="technicalSkill.name">
                <v-expansion-panel-title>
                    <div class="header">
                        <div class="name">
                            <strong>{{ technicalSkill.name }}</strong>
                        </div>
                        <div class="scoring">
                            {{ total(technicalSkill) }} von {{ maximalTotal(technicalSkill) }}
                        </div>
                        <div class="average">Ø {{ average(technicalSkill) }}</div>
                    </div>
                    <div class="progress-bar">
                        <ProgressBar
                            :total="total(technicalSkill)"
                            :max="maximalTotal(technicalSkill)"
                        ></ProgressBar>
                    </div>
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                    <v-table>
                        <tbody>
                            <tr
                                v-for="technicalSkillItem in technicalSkill.items"
                                :key="technicalSkillItem.index"
                            >
                                <td
                                    v-html="technicalSkillItem.description"
                                    class="description"
                                ></td>
                                <td class="score">
                                    {{ technicalSkillItem.score }}
                                </td>
                            </tr>
                        </tbody>
                    </v-table>
                </v-expansion-panel-text>
            </v-expansion-panel>
        </v-expansion-panels>
    </v-container>
</template>

<style lang="scss" scoped>
.pagetitle {
    font-size: 30px;
}

.name {
    font-size: 18px;
    padding-right: 20px;
    margin-bottom: 8px;
}

.scoring {
    margin-right: 5px;
    width: 75px;
    margin-bottom: 3px;
}

.average {
    color: #818181;
}

.description {
    padding-right: 10px;
}

.score {
    font-size: 25px;
}

.progress-bar {
    position: absolute;
    bottom: 0;
    height: 10px;
    width: 100%;
    left: 0;
}
</style>

<style lang="scss">
.technical-skills-panels {
    .v-expansion-panel-title__icon {
        position: absolute;
        right: 24px;
        top: 50%;
        margin-top: -12.25px;
    }

    .v-expansion-panel-title__icon {
        position: absolute;
        right: 24px;
        top: 50%;
        margin-top: -14.25px;
    }

    .v-expansion-panel-title {
        padding: 25px 16px 20px;
        display: block;
    }

    .v-expansion-panel-text__wrapper {
        padding: 8px 16px 16px;
    }

    .v-expansion-panel--active > .v-expansion-panel-title {
        min-height: auto;
    }

    .v-table .v-table__wrapper > table > tbody > tr > td {
        padding: 10px;
    }
}
</style>
