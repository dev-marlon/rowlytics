export interface TechnicalSkill {
    name: string
    items: TechnicalSkillItem[]
}

export interface TechnicalSkillItem {
    index: number
    description: string
    score: number | null
    maximalScore: number
}
