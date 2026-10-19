using System;
using System.Collections;
using System.Text;
using TMPro;
using UnityEngine;
using UnityEngine.Networking;

public class GameManager : MonoBehaviour
{
    [Header("UI")]
    [SerializeField] TMP_Text nombreText;
    [SerializeField] TMP_Text puntosText;
    [SerializeField] TMP_Text estadoText;

    [Header("API")]
    [SerializeField] string apiBase = "http://localhost:3000/game/";

    [Header("Solo para probar dentro del Editor de Unity")]
    [SerializeField] string editorUserId = "1";

    string userId;
    int puntos;
    bool cargado;

    [Serializable] class UserData { public string name; public int points; }
    [Serializable] class PointsBody { public int points; }

    void Start()
    {
        userId = ObtenerUserIdDeUrl();

        if (string.IsNullOrEmpty(userId))
        {
            estadoText.text = "No se recibió user_id en la URL";
            return;
        }
        StartCoroutine(CargarUsuario());
    }

    // Lee ?user_id=XX de la URL donde corre el juego (la del iframe)
    string ObtenerUserIdDeUrl()
    {
#if UNITY_EDITOR
        return editorUserId;
#else
        string url = Application.absoluteURL;
        int q = url.IndexOf('?');
        if (q < 0) return null;

        string query = url.Substring(q + 1);
        int hash = query.IndexOf('#');
        if (hash >= 0) query = query.Substring(0, hash);

        foreach (string par in query.Split('&'))
        {
            string[] kv = par.Split('=');
            if (kv.Length == 2 && kv[0] == "user_id")
                return UnityWebRequest.UnEscapeURL(kv[1]);
        }
        return null;
#endif
    }

    // GET /game/:user_id
    IEnumerator CargarUsuario()
    {
        estadoText.text = "Cargando...";
        using (UnityWebRequest req = UnityWebRequest.Get(apiBase + userId))
        {
            yield return req.SendWebRequest();

            if (req.result != UnityWebRequest.Result.Success)
            {
                estadoText.text = "Error al cargar: " + req.error;
                yield break;
            }

            UserData data = JsonUtility.FromJson<UserData>(req.downloadHandler.text);
            nombreText.text = data.name;
            puntos = data.points;
            cargado = true;
            ActualizarUI();
            estadoText.text = "";
        }
    }

    // Botón "Sumar punto": es la mecánica del juego
    public void SumarPunto()
    {
        if (!cargado) return;
        puntos++;
        ActualizarUI();
        estadoText.text = "Puntos sin guardar";
    }

    // Botón "Guardar": PUT /game/:user_id
    public void GuardarPuntos()
    {
        if (!cargado) return;
        StartCoroutine(EnviarPuntos());
    }

    IEnumerator EnviarPuntos()
    {
        string json = JsonUtility.ToJson(new PointsBody { points = puntos });
        estadoText.text = "Guardando...";

        using (UnityWebRequest req = new UnityWebRequest(apiBase + userId, "PUT"))
        {
            req.uploadHandler = new UploadHandlerRaw(Encoding.UTF8.GetBytes(json));
            req.downloadHandler = new DownloadHandlerBuffer();
            req.SetRequestHeader("Content-Type", "application/json");

            yield return req.SendWebRequest();

            estadoText.text = req.result == UnityWebRequest.Result.Success
                ? "¡Puntos guardados!"
                : "Error al guardar: " + req.error;
        }
    }

    void ActualizarUI() => puntosText.text = "Puntos: " + puntos;
}