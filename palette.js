class Palette {
    constructor() {
        this.values = [
            ['FBF8CC', 'FDE4CF', 'FFCFD2', 'F1C0E8', 'CFBAF0', 'A3C4F3', '90DBF4', '8EECF5', '98F5E1', 'B9FBC0'],
            ['EDEDE9', 'D6CCC2', 'F5EBE0', 'E3D5CA', 'D5BDAF'],
            ['8ECAE6', '219EBC', '023047', 'FFB703', 'FB8500'],
            ["606c38","283618","fefae0","dda15e","bc6c25"],
            ["780000","c1121f","fdf0d5","003049","669bbc"]
        ];       
        this.currenPaletteIndex = 0;
    }

    use(index) {
        this.currenPaletteIndex = index;
    }


    length() {
        return this.values[this.currenPaletteIndex].length;
    }

    getColor(colorIndex) {
        return color("#" + this.values[this.currenPaletteIndex][colorIndex]);
    }

    mapColor(currentValue, minValue, maxValue) {
        return this.getColor(Math.floor(map(currentValue, minValue, maxValue, 0, palette.length() - 1)));
    }

    createSelector(conf) {
        let result = createSelect();
        for (let i = 0; i < this.values.length; i++) {
            result.option(`PALETTE ${i}`, i);
        }
        if (conf && conf.positionX && conf.positionY) result.position(conf.positionX, conf.positionY);
        if (conf && conf.size) result.size(conf.size);
        if (conf && conf.input) result.input(conf.input);

        return result;
    }
}