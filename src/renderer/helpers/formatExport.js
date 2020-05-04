export const formatExport = (colors, imageAlphas) => {
    //Format export as KHS config
    let output = "{\n";
    colors.forEach((color, i) => {
        output += `\t"${color.label}":"${color.value.replace("#", "")}"`;
        output += ",";
        output += "\n";
    });

    output += `"phase_plant_backdrop": "Phase_Plant.png",
    "phase_plant_backdrop_alpha": "${imageAlphas["Phase_Plant"]}",
    "multipass_backdrop": "Multipass.png",
    "multipass_backdrop_alpha": "${imageAlphas["Multipass"]}",
    "snap_heap_backdrop": "Snap_Heap.png",
    "snap_heap_backdrop_alpha": "${imageAlphas["Snap_Heap"]}"
    `;

    /*    "multipass_backdrop": "Multipass.png",
    "multipass_backdrop_alpha": "0.15",
    "snap_heap_backdrop": "Snap_Heap.png",
    "snap_heap_backdrop_alpha": "0.2"*/

    output += "}";

    return output;
}