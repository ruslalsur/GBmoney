import axios from "axios";

export default {
    actions: {
        requestTransactions({commit}) {
            const headers = {
                'Content-Type': 'application/json'
            }
            const payload = {
                date_from: this.getters.getDateFrom,
                date_to: this.getters.getDateTo
            }
            commit('setLoadingStatus', true);
            // axios.post('/api/transactions', payload, {headers: headers})
            axios.get('storage/testTransactions.json', {headers: headers})
                .then(response => {
                    commit('setTransactions', response.data);
                })
                .catch(error => {
                    commit('setErrorStatus', true);
                    commit('setErrorInfo', 'Ошибка во время запроса данных о транзакциях');
                    //todo: обработка кодов с сервера
                })
                .finally(() => {
                    commit('setLoadingStatus', false);
                });
        }
    },
    mutations: {
        setTransactions(state, data) {
            state.transactions = data;
        },
        setLoadingStatus(state, data) {
            state.loadingStatus = data
        },
        setEditorShowStatus(state, data) {
            state.editorShowStatus = data
        },
        setEditorData(state, data) {
            state.editorData = Object.assign({}, data)
        },
        setErrorStatus(state, data) {
            state.errorStatus = data
        },
        setErrorInfo(state, data) {
            state.errorInfo = data
        },
        setEditable(state, data) {
            state.editable = data
        },
        setDateFrom(state, data) {
            state.dateFrom = data
        },
        setDateTo(state, data) {
            state.dateTo = data
        }
    },
    state: {
        transactions: {},
        editorData: {},
        loadingStatus: false,
        editorShowStatus: false,
        errorStatus: false,
        errorInfo: 'Нет данных!',
        editable: true,
        dateFrom: null,
        dateTo: null
    },
    getters: {
        getTransactions(state) {
            return state.transactions
        },
        getEditorData(state) {
            return state.editorData
        },
        getLoadingStatus(state) {
            return state.loadingStatus
        },
        getEditorShowStatus(state) {
            return state.editorShowStatus
        },
        getErrorStatus(state) {
            return state.errorStatus
        },
        getErrorInfo(state) {
            return state.errorInfo
        },
        getEditable(state) {
            return state.editable
        },
        getDateFrom(state) {
            return state.dateFrom
        },
        getDateTo(state) {
            return state.dateTo
        }
    }
}
