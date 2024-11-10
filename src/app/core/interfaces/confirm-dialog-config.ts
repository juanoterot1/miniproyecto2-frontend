export interface ConfirmDialogConfig {
    isVisible: boolean;
    title: string;
    message: string;
    onConfirm: () => Promise<void> | void;
    onCancel: () => void;
}
