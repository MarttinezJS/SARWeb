const paragraphs: string[] = [
  `El 1 de mayo de 1999, un empleado de las minas de carbón en la
    Guajira Colombiana, compartió la reflexión titulada “el trabajo
    desde la perspectiva de Dios”, mensaje que impactó a Los
    trabajadores de la época con acceso a la emisora, quienes
    manifestaron su encanto por la palabra del SEÑOR. Esta fue la
    chispa que impulsó la Radio Social, por los Técnicos Francisco
    Montaño y Fidel Barros.`,

  `Meses después se formalizó el espacio Sigue Adelante, lo que
    motivó a un grupo de empleados creyentes a unirse al programa;
    dando lugar a la conformación del Ministerio Radial, integrado por
    24 Ministro(a) s, a quienes recuerdo por su espíritu motivador en
    las oraciones, música y temas de gran impacto para la familia.`,

  `Sigue Adelante ha dejado huellas significativas en los empleados
    del complejo carbonífero más grande de latino américa. Al
    incrementar su cobertura con los programas: Vallenato Celestial y
    Tiempos de Reflexión. Esta visión misionera incursionó en otras
    estaciones radiales de público abierto, donde nos acompañó el
    periodista y consiervo en cristo Limedes Molina Urrego en materia
    de capacitación.`,

  `En marzo del 2020, se suspenden las operaciones en la empresa, por
    motivo de la pandemia mundial, en consecuencia cierran la emisora
    y por consiguiente toda la programación; Situación que abre las
    puertas al proyecto « SIGUE ADELANTE. RADIO» que hoy con fe,
    entusiasmo y la dirección del Espíritu Santo, dejamos a
    disposición de ustedes. Anhelamos llegarles a lo más profundo de
    sus vidas, con la programación acertada a sus expectativas y
    necesidades espirituales.`,
];
export const ReviewParagraph = () => {
  return (
    <div>
      <p>Reseña Histórica</p>
      {paragraphs.map((value) => (
        <p key={Math.random() * 100} className="my-2">
          {value}
        </p>
      ))}
    </div>
  );
};
