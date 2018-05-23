/**
 * Created by xorgnz on 4/8/2017.
 */
class Inventory {
    constructor(inventoryPanel) {
        this.objects        = [];
        this.inventoryPanel = inventoryPanel;
    }

    add(object) {
        if (_.indexOf(this.objects, object) === -1) {
            this.objects.push(object);
            this.refreshUI();
        }
    }

    clear() {
        this.objects = [];
        this.refreshUI();
    }

    remove(object) {
        if (_.indexOf(this.objects, object) !== -1) {
            _.remove(this.objects, object);
            this.refreshUI();
        }
    }

    refreshUI() {
        // Sort objects
        _.sortBy(this.objects, (obj) => { return obj; });

        this.inventoryPanel.clear();
        this.inventoryPanel.showObjects(this.objects, this);
    }
}