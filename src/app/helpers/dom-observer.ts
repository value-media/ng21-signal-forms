import { untracked } from "@angular/core";

export type ObserveOptions = {
    childList?: boolean;
    subtree?: boolean;
    tagName?: string;
    addedCssClass?: string;
};

export class DomObserver {
    options: ObserveOptions;
    private observer?: MutationObserver;

    constructor(options: ObserveOptions = { 
        childList: true, subtree: true 
    }) {
        this.options = options;
        if (typeof window !== 'undefined' && 
            typeof window.MutationObserver !== 'undefined' // check for SSR
        ) {
            this.observer = this._createObserver();
        }        
    }

    private _createObserver(): MutationObserver {
        if (!this.options.addedCssClass || !this.options.tagName) 
            return new MutationObserver(() => {});

        const callback: MutationCallback = (mutations) => {
            mutations.forEach((mutation) => {
                const todoItems = Array.from(mutation.addedNodes)
                    .filter((node) => 
                    node.nodeType === Node.ELEMENT_NODE && 
                    (node as Element).tagName.toLowerCase() === this.options.tagName?.toLowerCase()
                    );

                if (todoItems.length === 0) return;

                for(const node of todoItems) {
                    (node as Element).classList.add(this.options.addedCssClass!);
                }
                
                setTimeout(() => {
                    untracked(() => {
                    for(const node of todoItems) {
                        (node as Element).classList.remove(this.options.addedCssClass!);
                    }
                    });
                }, 1500);            
            });
        }

        return new MutationObserver(callback);        
    }
    
    observe(target?: Node, options?: MutationObserverInit) {
        options = {
            ...(options ?? {}),
            childList: this.options.childList ?? true,
            subtree: this.options.subtree ?? true,
        };

        this.observer?.observe(
            target ?? document.body, 
            options
        );
    }

    disconnect() {
        this.observer?.disconnect();
    }
}