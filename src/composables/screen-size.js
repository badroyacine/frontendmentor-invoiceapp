import { computed } from "vue"
import { useWindowSize } from '@vueuse/core'
import { SM_BREAKPOINT } from '@/utils/constants'

const { width } = useWindowSize()

export const useScreenSize = () => {
    const isMobile = computed(() => width.value <= SM_BREAKPOINT)

    return {
        isMobile
    }
}