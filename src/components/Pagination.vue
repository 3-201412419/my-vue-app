<template>
    <div class = "pagination">
        <button :disabled = "currentPage === 1" @click = "onPageChange(currentPage - 1)"> 이전 </button>
        <span> {{ currentPage }} / {{ totalPages }}</span>
        <button :disabled = "currentPage === totalPages" @click = "onPageChange(currentPage + 1)"> 다음 </button>
    </div>
</template>

<script lang = "ts">
    import { defineComponent } from 'vue';

    export default defineComponent({
        name : 'Pagination',
        props : {
            currentPage : {
                type : Number,
                required : true
            },

            totalPages : {
                type : Number,
                required : true
            }
        },

        setup(props, { emit }) {
            const onPageChange = (page : number) => {
                if (page >= 1 && page <= props.totalPages) {
                    emit('pageChanged', page);
                }
            };

            return {
                onPageChange
            }
        }
    })

</script>

<style lang="scss" scoped>
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;

  button {
    padding: 5px 10px;
    margin: 0 5px;
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 3px;
    cursor: pointer;

    &:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }
  }

  span {
    margin: 0 10px;
  }
}
</style>