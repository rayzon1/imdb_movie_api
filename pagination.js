class Pages {
    constructor() {
        this.$pagination = $('.pagination');
    }

    generateButtons(results) {
        console.log(results);
        let res = results.totalResults
        let num = Math.floor((res / 10));
        if (res > 100) {
            for(let i = 1; i <= 10; i ++){
                this.$pagination.append(
                    `<button class="button">${i}</button>`
                    );
            }
        } else {
            for(let i = 1; i <= num; i ++){
                this.$pagination.append(
                    `<button class="button">${i}</button>`
                    );
            }
        }
    }



}